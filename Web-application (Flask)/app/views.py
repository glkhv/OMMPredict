from crypt import methods
from datetime import date

from flask import Flask, render_template, flash, redirect, request, url_for, jsonify
from models import *
from config import app
from predict_service import *
from converting_service import *


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        patient_card = request.form['patient_card']
        date_research = date.today().strftime('%d.%m.%Y')
        relapse = request.form['relapse']
        periods = request.form['periods']
        mecho = request.form['mecho']
        first_symptom = request.form['first_symptom']
        emergency_birth = request.form['emergency_birth']
        fsh = request.form['fsh']
        vleft = request.form['vleft']
        vright = request.form['vright']
        vegfa634 = request.form['vegfa634']
        tp53 = request.form['tp53']
        vegfa936 = request.form['vegfa936']
        kitlg80441 = request.form['kitlg80441']

        vleft_new = float(vleft) * 532
        vright_new = float(vright) * 532
        vegfa634gg = 0.0
        vegfa634c = 0.0
        tp53gg = 0.0
        vegfa936cc = 0.0
        kitlg80441cc = 0.0

        vegfa634gg, vegfa634c, tp53gg, vegfa936cc, kitlg80441cc = convert(
            vegfa634, tp53, vegfa936, kitlg80441)

        target = predict(relapse, vegfa634gg, vegfa634c, periods, tp53gg, mecho,
                         vegfa936cc, first_symptom, kitlg80441cc, emergency_birth, vleft_new, fsh, vright_new)

        patient = Patients(patient_card, date_research, relapse, vegfa634, vegfa634gg, vegfa634c, periods, tp53, tp53gg,
                           mecho, vegfa936, vegfa936cc, first_symptom, kitlg80441, kitlg80441cc, emergency_birth, vleft, fsh, vright, target)
        db.session.add(patient)
        db.session.commit()
        return redirect(url_for('home'))
    return render_template('index.html', patients=list(reversed(Patients.query.all())))


@app.route('/<int:id>', methods=['POST'])
def research_open(id):
    research_object = {}
    patients = db.session.query(Patients).filter(
        Patients.id == id).first()

    research_object[0] = {
        'id': patients.id,
        'patient_card': patients.patient_card,
        'date_research': patients.date_research,
        'relapse': patients.relapse,
        'periods': patients.periods,
        'mecho': patients.mecho,
        'first_symptom': patients.first_symptom,
        'emergency_birth': patients.emergency_birth,
        'fsh': patients.fsh,
        'vleft': patients.vleft,
        'vright': patients.vright,
        'vegfa634': patients.vegfa634,
        'tp53': patients.tp53,
        'vegfa936': patients.vegfa936,
        'kitlg80441': patients.kitlg80441,
        'target': patients.target
    }

    resp = jsonify(research_object)
    resp.status_code = 200

    return resp


@app.route('/delete/<int:id>', methods=['POST', 'GET'])
def research_delete(id):
    patient = Patients.query.get(id)

    db.session.delete(patient)
    db.session.commit()

    return jsonify({"message": "true"})


@app.route('/update/<int:id>', methods=['POST', 'GET'])
def update(id):
    if request.method == 'POST':
        patients = db.session.query(Patients).filter(
            Patients.id == id).first()

        patients.date_research = date.today().strftime('%d.%m.%Y')
        patients.relapse = request.form['relapse']
        patients.periods = request.form['periods']
        patients.mecho = request.form['mecho']
        patients.first_symptom = request.form['first_symptom']
        patients.emergency_birth = request.form['emergency_birth']
        patients.fsh = request.form['fsh']
        patients.vleft = request.form['vleft']
        patients.vright = request.form['vright']
        patients.vegfa634 = request.form['vegfa634']
        patients.tp53 = request.form['tp53']
        patients.vegfa936 = request.form['vegfa936']
        patients.kitlg80441 = request.form['kitlg80441']

        vleft_new = float(patients.vleft) * 532
        vright_new = float(patients.vright) * 532

        patients.vegfa634gg, patients.vegfa634c, patients.tp53gg, patients.vegfa936cc, patients.kitlg80441cc = convert(
            patients.vegfa634, patients.tp53, patients.vegfa936, patients.kitlg80441)

        patients.target = predict(patients.relapse, patients.vegfa634gg, patients.vegfa634c, patients.periods, patients.tp53gg, patients.mecho,
                                  patients.vegfa936cc, patients.first_symptom, patients.kitlg80441cc, patients.emergency_birth, vleft_new, patients.fsh, vright_new)

        db.session.commit()

    return jsonify({"message": "true"})
