/**
 * Module dependencies
 */
var actionUtil = require('../blueprints/actionUtil');
var _ = require('lodash');


/**
 * Remove a member from an association
 *
 * @param {Integer|String} parentid  - the unique id of the parent record
 * @param {Integer|String} id  - the unique id of the child record to remove
 *
 * @option {String} model  - the identity of the model
 * @option {String} alias  - the name of the association attribute (aka "alias")
 */

module.exports = function remove(req, res) {

  // Ensure a model and alias can be deduced from the request.
  var Model = actionUtil.parseModel(req);
  var relation = req.options.alias;
  if (!relation) {
    return res.serverError(new Error('Missing required route option, `req.options.alias`.'));
  }

  // The primary key of the parent record
  var parentPk = req.param('parentid');

  // The primary key of the child record to remove
  // from the aliased collection
  var associationAttr = _.findWhere(Model.associations, { alias: relation });
  var childPk = actionUtil.parsePk(req);
  var ChildModel = req._sails.models[associationAttr.collection];

  console.log('REMOVE');
  console.log(ChildModel);
  console.log(childPk);
  // var childPkAttr = ChildModel.primaryKey;

  if(_.isUndefined(childPk)) {
    return res.serverError('Missing required child PK.');
  }

  Model
  .findOne(parentPk).exec(function found(err, parentRecord) {
    if (err) return res.serverError(err);
    if (!parentRecord) return res.notFound();
    if (!parentRecord[relation]) return res.notFound();

    parentRecord[relation].remove(childPk);
    parentRecord.save(function(err) {
      if (err) return res.negotiate(err);

      Model.findOne(parentPk)
      .populate(relation)
      // TODO: use populateRequest util instead
      .exec(function found(err, parentRecord) {
        if (err) return res.serverError(err);
        if (!parentRecord) return res.serverError();
        if (!parentRecord[relation]) return res.serverError();
        if (!parentRecord[Model.primaryKey]) return res.serverError();

        ChildModel.findOne(childPk).exec(function foundChild(err, childRecord) {
          childRecord.selfUpdate({parentType: req.options.model,parentId:parentPk , verb:'remove'},function(e,data){
            console.log('after cb self remove');
              if (req._sails.hooks.pubsub) {
                Model.publishRemove(parentRecord[Model.primaryKey], relation, childPk, !req._sails.config.blueprints.mirror && req);
              }

              es.update(req.options.model,parentRecord).then(function(){
                console.log('REMOVE ES in then end of remove fn');
                  // return callback()
                // res.created(matchingRecord);
              return res.ok(parentRecord);
              }).catch(function(err){
                     console.log(err);
              })
          });
        });

        // If we have the pubsub hook, use the model class's publish method
        // to notify all subscribers about the removed item
        
      });
    });
  });

};
