from config import db


class Patients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_card = db.Column(db.String(20), nullable=False)
    date_research = db.Column(db.String(20), nullable=False)
    imt = db.Column(db.Float, nullable=False)
    periods = db.Column(db.Integer, nullable=False)
    fsh = db.Column(db.Float, nullable=False)
    kitlg80441 = db.Column(db.String, nullable=False)
    vegfa12143 = db.Column(db.String, nullable=False)
    vegfa2578 = db.Column(db.String, nullable=False)
    vegfa634 = db.Column(db.String, nullable=False)
    vegfac936tcc = db.Column(db.String, nullable=False)
    tp53arg75pro = db.Column(db.String, nullable=False)
    mecho = db.Column(db.Float, nullable=False)
    vright = db.Column(db.Float, nullable=False)
    vleft = db.Column(db.Float, nullable=False)
    target = db.Column(db.Boolean, nullable=True)

    def __init__(self, patient_card, date_research, imt, periods, fsh, kitlg80441, vegfa12143, vegfa2578, vegfa634, vegfac936tcc, tp53arg75pro, mecho, vright, vleft, target):
        self.patient_card = patient_card
        self.date_research = date_research
        self.imt = imt
        self.periods = periods
        self.fsh = fsh
        self.kitlg80441 = kitlg80441
        self.vegfa12143 = vegfa12143
        self.vegfa2578 = vegfa2578
        self.vegfa634 = vegfa634
        self.vegfac936tcc = vegfac936tcc
        self.tp53arg75pro = tp53arg75pro
        self.mecho = mecho
        self.vright = vright
        self.vleft = vleft
        self.target = target


def database_initialization_sequence():
    db.create_all()
    test_rec = Patients('a1', '01.02.2022', 1.0, 1, 1.0, 1, '1', '1',
                        '1', '1', '1', '1.0', 1.0, 1.0, True)

    db.session.add(test_rec)
    db.session.rollback()
    db.session.commit()
