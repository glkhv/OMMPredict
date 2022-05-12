from config import db


class Patients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_card = db.Column(db.String(20), nullable=False)
    date_research = db.Column(db.String(20), nullable=False)
    relapse = db.Column(db.Float, nullable=False)
    vegfa634 = db.Column(db.String(20), nullable=False)
    vegfa634gg = db.Column(db.Float, nullable=False)
    vegfa634c = db.Column(db.Float, nullable=False)
    periods = db.Column(db.Float, nullable=False)
    tp53 = db.Column(db.String(20), nullable=False)
    tp53gg = db.Column(db.Float, nullable=False)
    mecho = db.Column(db.Float, nullable=False)
    vegfa936 = db.Column(db.String(20), nullable=False)
    vegfa936cc = db.Column(db.Float, nullable=False)
    first_symptom = db.Column(db.Float, nullable=False)
    kitlg80441 = db.Column(db.String(20), nullable=False)
    kitlg80441cc = db.Column(db.Float, nullable=False)
    emergency_birth = db.Column(db.Float, nullable=False)
    vleft = db.Column(db.Float, nullable=False)
    fsh = db.Column(db.Float, nullable=False)
    vright = db.Column(db.Float, nullable=False)
    target = db.Column(db.Boolean, nullable=True)

    def __init__(self, patient_card, date_research, relapse, vegfa634, vegfa634gg, vegfa634c, periods, tp53, tp53gg,
                 mecho, vegfa936, vegfa936cc, first_symptom, kitlg80441, kitlg80441cc, emergency_birth, vleft, fsh, vright, target):
        self.patient_card = patient_card
        self.date_research = date_research
        self.relapse = relapse
        self.vegfa634 = vegfa634
        self.vegfa634gg = vegfa634gg
        self.vegfa634c = vegfa634c
        self.periods = periods
        self.tp53 = tp53
        self.tp53gg = tp53gg
        self.mecho = mecho
        self.vegfa936 = vegfa936
        self.vegfa936cc = vegfa936cc
        self.first_symptom = first_symptom
        self.kitlg80441 = kitlg80441
        self.kitlg80441cc = kitlg80441cc
        self.emergency_birth = emergency_birth
        self.vleft = vleft
        self.fsh = fsh
        self.vright = vright
        self.target = target


def database_initialization_sequence():
    db.create_all()
    test_rec = Patients('a1', '01.02.2022', 1.0, 'TT', 1.0, 1.0, 1.0,
                        'TT', 1.0, 1.0, 'TT', 1.0, 1.0, 'TT', 1.0, 1.0, 1.0, 1.0, 1.0, True)

    db.session.add(test_rec)
    db.session.rollback()
    db.session.commit()
