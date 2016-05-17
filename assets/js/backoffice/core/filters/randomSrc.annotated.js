angular.module('core').filter('randomSrc', function () {
    return function (input) {
        if (input)
            return input + '?r=' + Math.round(Math.random() * 999999);
    }
})