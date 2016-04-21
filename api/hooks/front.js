module.exports = function front(sails) {

   // This var will be private
   var foo = 'barcbbbvgggvbbccc';

   // This var will be public
   this.abc = 125244253;
   // console.log('front');
   // console.log(this.abc);

   return {
      yoda : 'yoda',
      // This function will be public
      sayHi: function (name) {
         return "Hi, " + name + "!";
      } 

   };


};