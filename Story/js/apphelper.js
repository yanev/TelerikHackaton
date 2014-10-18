var AppHelper = {
    resolveImageUrl: function (id) {
        if (id) {
            return el.Files.getDownloadUrl(id);
        }
        else {
            return '';
        }
    },
    getBase64ImageFromInput : function (input, cb) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            if (cb)
                cb(e.target.result);
        };
        reader.readAsDataURL(input);
    },
    getImageFileObject: function(input, cb) {
        var name = input.name;
        var ext = name.substr(name.lastIndexOf('.') + 1);
        var mimeType = mimeMap[ext];
        if(mimeType) {
            this.getBase64ImageFromInput(input, function(base64) {
                var res = {
                    "Filename"    : name,
                    "ContentType" : mimeType,
                    "base64"      : base64.substr(base64.lastIndexOf('base64,')+7)
                }
                cb(null, res);
            });
        } else {
            cb("File type not supported: " + ext);
        }
    }
};