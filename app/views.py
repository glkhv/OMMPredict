from crypt import methods
from datetime import date
from email.mime import application

from flask import Flask, render_template, flash, redirect, request, url_for, jsonify
from models import *
from config import app
from prediction_service import *


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        if not request.form['patient_card'] or not request.form['imt'] or not request.form['periods'] or not request.form['fsh'] or not request.form['kitlg80441'] or not request.form['vegfa12143'] or not request.form['vegfa2578'] or not request.form['vegfa634'] or not request.form['vegfac936tcc'] or not request.form['tp53arg75pro'] or not request.form['mecho'] or not request.form['vright'] or not request.form['vleft']:
            flash('Please enter all the fields', 'error')
        else:
            patient_card = request.form['patient_card']
            date_research = date.today().strftime('%d.%m.%Y')
            imt = request.form['imt']
            periods = request.form['periods']
            fsh = request.form['fsh']
            kitlg80441 = request.form['kitlg80441']
            vegfa12143 = request.form['vegfa12143']
            vegfa2578 = request.form['vegfa2578']
            vegfa634 = request.form['vegfa634']
            vegfac936tcc = request.form['vegfac936tcc']
            tp53arg75pro = request.form['tp53arg75pro']
            mecho = request.form['mecho']
            vright = request.form['vright']
            vleft = request.form['vleft']
            # target = predict(imt, periods, fsh, kitlg80441, vegfa12143, vegfa2578,
            #                  vegfa634, vegfac936tcc, tp53arg75pro, mecho, vright, vleft)
            target = False
            patient = Patients(patient_card, date_research, imt, periods, fsh, kitlg80441,
                               vegfa12143, vegfa2578, vegfa634, vegfac936tcc, tp53arg75pro, mecho, vright, vleft, target)
            db.session.add(patient)
            db.session.commit()
            flash('Record was succesfully added')
            return redirect(url_for('home'))
    return render_template('show_all.html', patients=list(reversed(Patients.query.all())))


@ app.route('/<int:id>', methods=['POST'])
def research_open(id):
    research_object = {}
    patients = db.session.query(Patients).filter(
        Patients.id == id).first()

    research_object[0] = {
        'id': patients.id,
        'patient_card': patients.patient_card,
        'date_research': patients.date_research,
        'imt': patients.imt,
        'periods': patients.periods,
        'fsh': patients.fsh,
        'kitlg80441': patients.kitlg80441,
        'vegfa12143': patients.vegfa12143,
        'vegfa2578': patients.vegfa2578,
        'vegfa634': patients.vegfa634,
        'vegfac936tcc': patients.vegfac936tcc,
        'tp53arg75pro': patients.tp53arg75pro,
        'mecho': patients.mecho,
        'vright': patients.vright,
        'vleft': patients.vleft,
        'target': patients.target
    }

    resp = jsonify(research_object)
    resp.status_code = 200

    return resp


@ app.route('/delete/<int:id>', methods=['POST', 'GET'])
def research_delete(id):
    patient = Patients.query.get(id)

    db.session.delete(patient)
    db.session.commit()

    return jsonify({"message": "true"})


@ app.route('/update/<int:id>', methods=['POST', 'GET'])
def update(id):
    if request.method == 'POST':
        patients = db.session.query(Patients).filter(
            Patients.id == id).first()

        patients.date_research = date.today().strftime('%d.%m.%Y')
        patients.imt = request.form['imt']
        patients.periods = request.form['periods']
        patients.fsh = request.form['fsh']
        patients.kitlg80441 = request.form['kitlg80441']
        patients.vegfa12143 = request.form['vegfa12143']
        patients.vegfa2578 = request.form['vegfa2578']
        patients.vegfa634 = request.form['vegfa634']
        patients.vegfac936tcc = request.form['vegfac936tcc']
        patients.tp53arg75pro = request.form['tp53arg75pro']
        patients.mecho = request.form['mecho']
        patients.vright = request.form['vright']
        patients.vleft = request.form['vleft']
        patients.target = False
        # target = predict(imt, periods, fsh, kitlg80441, vegfa12143, vegfa2578,
        #                  vegfa634, vegfac936tcc, tp53arg75pro, mecho, vright, vleft)

        db.session.commit()
        flash('Record was succesfully updated')

    return jsonify({"message": "true"})
