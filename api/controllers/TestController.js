/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `TestController.toto()`
   */
  toto: function (req, res) {

  	console.log(sails.hooks.front.yoda);
    return res.json({
      todo: '2 is not implemented yet!'
    });
  }
};

