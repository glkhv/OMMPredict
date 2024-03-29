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

    if (data[0].target == false) {
        descr = `
            <div class="titleside col s3">
                <h5>№${data[0].patient_card}</h5>
                <p>${data[0].date_research}</p>
            </div>
            <div class="resultside col s3">
                <p class="resultside__p" style="color: white !important; background-color: #66bb6a;">Низкий риск снижения овариального резерва</p>
            </div>
            <div class="divider"></div>
            <form class="params" id="params" data-id="${data[0].id}">
                <div class="input-field col s3 paramsside">
                    <select form="params" class="input-select" value="${data[0].relapse}" id="relapse" type="text" name="relapse" required>
                    <option value="${data[0].relapse}" selected>${data[0].relapse}</option>
                    <option value="1">1</option>
                    <option value="0">0</option>
                    </select>
                    <label for="relapse">Рецидив эндометриомы яичника</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].periods}" id="periods" type="number" step="any" name="periods" required>
                    <label for="periods">Менструация, дней</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].emergency_birth}" id="emergency_birth" type="number" step="any" name="emergency_birth" required>
                    <label for="emergency_birth">Срочные оперативные роды (кол-во)</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].first_symptom}" id="first_symptom" type="number" step="any" name="first_symptom" required>
                    <label for="first_symptom">Появление первых симптомов (лет)</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].fsh}" id="fsh" type="number" step="any" name="fsh" required>
                    <label for="fsh">ФСГ до операции, мМе/мл</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].mecho}" id="mecho" type="number" step="any" name="mecho" required>
                    <label for="mecho">М-Эхо</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vleft}" id="vleft" type="number" step="any" name="vleft" required>
                    <label for="vleft">V левого яичника</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vright}" id="vright" type="number" step="any" name="vright" required>
                    <label for="vright">V правого яичника</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select name="vegfa634" form="params" class="input-select" id="vegfa634" type="text" name="vegfa634" required>
                        <option value="${data[0].vegfa634}" selected>${data[0].vegfa634}</option>
                        <option value="CC">CC</option>
                        <option value="GC">GC</option>
                        <option value="GG">GG</option>
                    </select>
                    <label for="vegfa634">VEGF-A: -634</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select name="tp53" form="params" class="input-select" id="tp53" type="text" name="tp53" required>
                        <option value="${data[0].tp53}" selected>${data[0].tp53}</option>
                        <option value="CC">CC</option>
                        <option value="CG">CG</option>
                        <option value="GG">GG</option>
                    </select>
                    <label for="tp53">TP53: Ex4+119</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select name="vegfa936" form="params" class="input-select" id="vegfa936" type="text" name="vegfa936" required>
                        <option value="${data[0].vegfa936}" selected>${data[0].vegfa936}</option>
                        <option value="CC">CC</option>
                        <option value="CT">CT</option>
                        <option value="TT">TT</option>
                    </select>
                    <label for="vegfa936">VEFG-A: +936</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select name="kitlg80441" form="params" class="input-select" id="kitlg80441" type="text" name="kitlg80441" required>
                        <option value="${data[0].kitlg80441}" selected>${data[0].kitlg80441}</option>
                        <option value="CC">CC</option>
                        <option value="CT">CT</option>
                        <option value="TT">TT</option>
                    </select>
                    <label for="kitlg80441">KITLG: 80441</label>
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
                <p class="resultside__p" style="color: white !important; background-color: #ef5350;">Высокий риск снижения овариального резерва</p>
            </div>
            <div class="divider"></div>
            <form class="params" id="params" data-id="${data[0].id}">
                <div class="input-field col s3 paramsside">
                    <select class="input-select" form="params" value="${data[0].relapse}" id="relapse" type="text" name="relapse" required>
                    <option value="${data[0].relapse}" selected>${data[0].relapse}</option>
                    <option value="1">1</option>
                    <option value="0">0</option>
                    </select>
                    <label for="relapse">Рецидив эндометриомы яичника</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].periods}" id="periods" type="number" step="any" name="periods" required>
                    <label for="periods">Менструация, дней</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].emergency_birth}" id="emergency_birth" type="number" step="any" name="emergency_birth" required>
                    <label for="emergency_birth">Срочные оперативные роды (кол-во)</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].first_symptom}" id="first_symptom" type="number" step="any" name="first_symptom" required>
                    <label for="first_symptom">Появление первых симптомов (лет)</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].fsh}" id="fsh" type="number" step="any" name="fsh" required>
                    <label for="fsh">ФСГ до операции, мМе/мл</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].mecho}" id="mecho" type="number" step="any" name="mecho" required>
                    <label for="mecho">М-Эхо</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vleft}" id="vleft" type="number" step="any" name="vleft" required>
                    <label for="vleft">V левого яичника</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <input class="input-text" value="${data[0].vright}" id="vright" type="number" step="any" name="vright" required>
                    <label for="vright">V правого яичника</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select name="vegfa634" form="params" class="input-select" id="vegfa634" type="text" name="vegfa634" required>
                        <option value="${data[0].vegfa634}" selected>${data[0].vegfa634}</option>
                        <option value="CC">CC</option>
                        <option value="GC">GC</option>
                        <option value="GG">GG</option>
                    </select>
                    <label for="vegfa634">VEGF-A: -634</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select name="tp53" form="params" class="input-select" id="tp53" type="text" name="tp53" required>
                        <option value="${data[0].tp53}" selected>${data[0].tp53}</option>
                        <option value="CC">CC</option>
                        <option value="GC">GC</option>
                        <option value="GG">GG</option>
                    </select>
                    <label for="tp53">TP53: Ex4+119</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select name="vegfa936" form="params" class="input-select" id="vegfa936" type="text" name="vegfa936" required>
                        <option value="${data[0].vegfa936}" selected>${data[0].vegfa936}</option>
                        <option value="CC">CC</option>
                        <option value="CT">CT</option>
                        <option value="TT">TT</option>
                    </select>
                    <label for="vegfa936">VEFG-A: +936</label>
                </div>
                <div class="input-field col s3 paramsside">
                    <select name="kitlg80441" form="params" class="input-select" id="kitlg80441" type="text" name="kitlg80441" required>
                        <option value="${data[0].kitlg80441}" selected>${data[0].kitlg80441}</option>
                        <option value="CC">CC</option>
                        <option value="CT">CT</option>
                        <option value="TT">TT</option>
                    </select>
                    <label for="kitlg80441">KITLG: 80441</label>
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
