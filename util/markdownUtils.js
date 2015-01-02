

marked = require('marked');

module.exports = {

    getMarkdownHeader : function (data) {
        var tokens = ['---','---'];
        var strReg = "^" + tokens[0] + "([\\s|\\S]*?)" + tokens[1],
            reg = new RegExp(strReg),
            file = reg.exec(data);

        return file ? file[1] : new Error("Can't get the header");
    },

    getMarkdownContent : function (data) {
        var tokens = ['---','---'];
        var strReg = "^ *?\\" + tokens[0] + "[^]*?" + tokens[1] + "*",
            reg = new RegExp(strReg),
            content = data.replace(reg, "");

        return content ? marked(content) : new Error("Can't get the content");
    }

};