/* jquery ve ajax ile progressbarlı dosya upload işlemi */

$('#photo-uploader').change((e) => {
        e.preventDefault();

        $.ajax({
            url: '/photo/upload',
            type: 'POST',
            processData: false,
            contentType: false,
            data: new FormData($('#print-order-form')[0]),
            beforeSend: () => {
                $('.progress').show();
            },
            xhr: () => {
                var xhr = $.ajaxSettings.xhr();
                xhr.upload.onprogress = (e) => {
                    var percentProgress = Math.floor(e.loaded / e.total *100) + '%';
                    $('.progress-bar').css('width', percentProgress);
                    $('.progress-bar').text(percentProgress);
                };
                return xhr;
            },
            success: (res) => {
                $('.progress').hide();
                $('.progress-bar').css('width', '0%');
                $('.progress-bar').text('0%');
                console.log(res);
            }
        });
