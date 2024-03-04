const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    truncate: function (str, len) {
        if(str.length > len && str.length > 0){
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = new_str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    stripTags: function (input){
        input = input.replace(/&nbsp;/gm, ' ')
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (contentUser, loggedUser, contentId, floating = true){
        if(contentUser._id.toString() == loggedUser._id.toString()){
            if(floating){ console.log('floating')
                return `<a href="/contents/edit/${contentId}" class="btn-floating
                halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            }else{ console.log('not floating')
                return `<a href="/contents/edit/${contentId}"><i class="fas fa-edit"></i></a>`
            }
        }else{
            return ''
        }
    },
    select: function (selected, options){
        return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        )
    }


}