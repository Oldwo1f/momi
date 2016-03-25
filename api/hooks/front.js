module.exports = function front(sails) {

   // This var will be private
   var foo = 'bar';

   // This var will be public
   this.abc = 123;
   console.log('front');
   console.log(this.abc);

   return {
      yoda : 'yoda',
      // This function will be public
      sayHi: function (name) {
         return "Hi, " + name + "!";
      } 

   };


};