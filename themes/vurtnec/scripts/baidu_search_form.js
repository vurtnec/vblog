
/*
    Baidu search plugin for hexo.

 */
hexo.extend.helper.register('baidu_search_form', function (options) {
    options = options || {};

    var config = this.config;
    var className = options.class || 'search-form';
    var text = options.hasOwnProperty('text') ? options.text : 'Search';
    var button = options.button;

    var siteUrl = config.url.substr(7);

    return '<form action="//www.baidu.com/s" method="get" accept-charset="UTF-8" class="' + className + '">' +
        '<input type="search" name="q1" results="0" class="' + className + '-input"' + (text ? ' placeholder="' + text + '"' : '') + '>' +
        (button ? '<button type="submit" class="' + className + '-submit">' + (typeof button === 'string' ? button : text) + '</button>' : '') +
        '<input type="hidden" name="q6" value="' + siteUrl + '">' +
        '</form>';
});

