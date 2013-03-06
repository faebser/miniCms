// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
(function($){
    if(!$.lessCode){
        $.lessCode = new Object();
    };
    
    $.lessCode.backEndConnect = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("lessCode.backEndConnect", base);
        
        base.init = function(){
            base.options = $.extend({},$.lessCode.backEndConnect.defaultOptions, options);

            // add eventlistener for all contenteditable
            base.$el.find("*[contenteditable]").bind("input", function(event) {
                var data = {
                    id : $(this).attr("id"),
                    content : $(this).html()
                };
                $.post('http://localhost:8080/', data, function(data) {
                    console.log(data);
                });
                console.log(data);
            });            
        };
        
        // Sample Function, Uncomment to use
        // base.functionName = function(paramaters){
        // 
        // };
        
        // Run initializer
        base.init();
    };
    
    $.lessCode.backEndConnect.defaultOptions = {
    };
    
    $.fn.lesscode_backEndConnect = function(element, options){
        return this.each(function(){
            (new $.lessCode.backEndConnect(this, element, options));
        });
    };
    
    // This function breaks the chain, but returns
    // the lessCode.backEndConnect if it has been attached to the object.
    $.fn.getlessCode_backEndConnect = function(){
        this.data("lessCode.backEndConnect");
    };
    
})(jQuery);
