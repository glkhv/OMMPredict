$('.side-open').on('click', function (e) {
    e.preventDefault();

    $('#slide-out').addClass('active');

    const id = $(this).attr('data-id');

    $.ajax({
        url: `/${Number(id)}`,
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            $('.contentside').html(fillData(data));

            setTimeout(() => {
                $('.titleside col s3').fadeOut(300);
            }, 1000);
            M.updateTextFields();
            $('select').formSelect();
            checkButtons();
            buttonEnable();
            updateResearch();
        },
    });
});

function buttonEnable() {
    $('input.input-text').on('input change', function (e) {
        e.preventDefault();
        $('#save-button').attr('disabled', false);
    });
    $('select.input-select').on('input change', function (e) {
        e.preventDefault();
        $('#save-button').attr('disabled', false);
    });
}

function fillData(data) {
    let descr = ``;

    if (data[0].target) {
        descr = `
            <div class="titleside col s3">
                <h5>№${data[0].patient_card}</h5>
                <p>${data[0].date_research}</p>
            </div>
            <div class="resultside col s3">
                <p class="resultside__p" style="color: white; background-color: #66bb6a;">Низкий риск снижения овуляторного резерва</p>
            </div>
            <div class="divider"></div>
            <form class="params" id="params" data-id="${data[0].id}">
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].imt}" id="imt" type="text" name="imt">
                    <label for="imt">ИМТ, кг/м2</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].periods}" id="periods" type="text" name="periods">
                    <label for="periods">Продолжительность менструации, дней</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].fsh}" id="fsh" type="text" name="fsh">
                    <label for="fsh">ФСГ до операции, мМе/мл</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].mecho}" id="mecho" type="text" name="mecho">
                    <label for="mecho">М-эхо, мм</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vright}" id="vright" type="text" name="vright">
                    <label for="vright">V правого яичника, см3</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vleft}" id="vleft" type="text" name="vleft">
                    <label for="vleft">V левого яичника, см3</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].kitlg80441}" id="kitlg80441" type="text" name="kitlg80441">
                    <label for="kitlg80441">kitlg80441</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vegfa12143}" id="vegfa12143" type="text" name="vegfa12143">
                    <label for="vegfa12143">vegfa12143</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vegfa2578}" id="vegfa2578" type="text" name="vegfa2578">
                    <label for="vegfa2578">vegfa2578</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vegfa634}" id="vegfa634" type="text" name="vegfa634">
                    <label for="vegfa634">vegfa634</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vegfac936tcc}" id="vegfac936tcc" type="text" name="vegfac936tcc">
                    <label for="vegfac936tcc">vegfac936tcc</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].tp53arg75pro}" id="tp53arg75pro" type="text" name="tp53arg75pro">
                    <label for="tp53arg75pro">tp53arg75pro</label>
                </div>
                <input class="btn blue waves-effect waves-light" id="save-button" type="submit" data-id="${data[0].id}" style="margin-top: 1rem;" value="Сохранить изменения" disabled>
            </form>
            <div class="divider" style="margin-top: 2rem;"></div>
            <div class="delete-button-container">
                <a class="delete-button" data-id="${data[0].id}" style="color: #ef5350 !important;">Удалить исследование</a>
            </div>`;
    } else {
        descr = `
            <div class="titleside col s3">
                <h5>№${data[0].patient_card}</h5>
                <p>${data[0].date_research}</p>
            </div>
            <div class="resultside col s3">
                <p class="resultside__p" style="color: white; background-color: #ef5350;">Высокий риск снижения овуляторного резерва</p>
            </div>
            <div class="divider"></div>
            <form class="params" id="params" data-id="${data[0].id}">
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].imt}" id="imt" type="text" name="imt">
                    <label for="imt">ИМТ, кг/м2</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].periods}" id="periods" type="text" name="periods">
                    <label for="periods">Продолжительность менструации, дней</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].fsh}" id="fsh" type="text" name="fsh">
                    <label for="fsh">ФСГ до операции, мМе/мл</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].mecho}" id="mecho" type="text" name="mecho">
                    <label for="mecho">М-эхо, мм</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vright}" id="vright" type="text" name="vright">
                    <label for="vright">V правого яичника, см3</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vleft}" id="vleft" type="text" name="vleft">
                    <label for="vleft">V левого яичника, см3</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select class="input-select" id="kitlg80441" type="text" name="kitlg80441">
                        <option value="${data[0].kitlg80441}" disabled selected>${data[0].kitlg80441}</option>
                        <option value="CC">CC</option>
                        <option value="CT">CT</option>
                        <option value="TT">TT</option>
                    </select>
                    <label for="kitlg80441">kitlg80441</label>
				</div>
                <div class="input-field col s3 paramsside">
                    <select class="input-select" id="vegfa12143" type="text" name="vegfa12143">
                        <option value="${data[0].vegfa12143}" disabled selected>${data[0].vegfa12143}</option>
                        <option value="AA">AA</option>
                        <option value="CA">CA</option>
                        <option value="CC">CC</option>
                    </select>
                    <label for="vegfa12143">vegfa12143</label>
				</div>
                <div class="input-field col s3 paramsside">
                    <select class="input-select" id="vegfa2578" type="text" name="vegfa2578">
                        <option value="${data[0].vegfa2578}" disabled selected>${data[0].vegfa2578}</option>
                        <option value="AA">AA</option>
                        <option value="CA">CA</option>
                        <option value="CC">CC</option>
                    </select>
                    <label for="vegfa2578">vegfa2578</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select class="input-select" id="vegfa634" type="text" name="vegfa634">
                        <option value="${data[0].vegfa634}" disabled selected>${data[0].vegfa634}</option>
                        <option value="CC">CC</option>
                        <option value="GC">GC</option>
                        <option value="GG">GG</option>
                    </select>
                    <label for="vegfa634">vegfa634</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select class="input-select" id="vegfac936tcc" type="text" name="vegfac936tcc">
                        <option value="${data[0].vegfac936tcc}" disabled selected>${data[0].vegfac936tcc}</option>
                        <option value="CC">CC</option>
                        <option value="CT">CT</option>
                        <option value="TT">TT</option>
                    </select>
                    <label for="vegfac936tcc">vegfac936tcc</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select class="input-select" id="tp53arg75pro" type="text" name="tp53arg75pro">
                        <option value="${data[0].tp53arg75pro}" disabled selected>${data[0].tp53arg75pro}</option>
                        <option value="CC">CC</option>
                        <option value="CG">CG</option>
                        <option value="GG">GG</option>
                    </select>
                    <label for="tp53arg75pro">tp53arg75pro</label>
                </div>
                <input class="btn blue waves-effect waves-light" id="save-button" type="submit" data-id="${data[0].id}" style="margin-top: 1rem;" value="Сохранить изменения" disabled>
            </form>
            <div class="divider" style="margin-top: 2rem;"></div>
            <div class="delete-button-container">
                <a class="delete-button" data-id="${data[0].id}" style="color: #ef5350 !important;">Удалить исследование</a>
            </div>`;
    }

    return descr;
}

function checkButtons() {
    $('.delete-button').on('click', function (e) {
        e.preventDefault();

        const id = $(this).attr('data-id');

        $.ajax({
            url: `/delete/${Number(id)}`,
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                setTimeout(() => {
                    $('.card-row[data-id="' + id + '"]').slideUp(300);
                    $('.sidenav').addClass('.sidenav-close');
                    $('.sidenav').sidenav('close');
                }, 500);
            },
        });
    });
}

function updateResearch() {
    $('form').on('submit', function (e) {
        const id = $(this).attr('data-id');
        var form = $(this);

        $.ajax({
            data: form.serialize(),
            url: `/update/${Number(id)}`,
            type: 'POST',
            success: function () {
                alert('Исследование успешно обновлено!');
                location.reload();
            },
        });
    });
}

// ПРОБЛЕМА В ЕБУЧИХ СЕЛЕКТАХ. НУЖНЫ ИНПУТЫ!!!
