def convert(vegfa634, tp53, vegfa936, kitlg80441):
    vegfa634gg = 0.0
    vegfa634c = 0.0
    tp53gg = 0.0
    vegfa936cc = 0.0
    kitlg80441cc = 0.0

    match vegfa634:
        case 'GG':
            vegfa634gg = 0.0
            vegfa634c = 0.0
        case 'GC':
            vegfa634gg = 1.0
            vegfa634c = 1.0
        case 'CC':
            vegfa634gg = 2.0
            vegfa634c = 1.0

    match tp53:
        case 'GG':
            tp53gg = 0.0
        case 'GC':
            tp53gg = 1.0
        case 'CC':
            tp53gg = 2.0

    match vegfa936:
        case 'CC':
            vegfa936cc = 0.0
        case 'CT':
            vegfa936cc = 1.0
        case 'TT':
            vegfa936cc = 2.0

    match kitlg80441:
        case 'CC':
            kitlg80441cc = 0.0
        case 'CT':
            kitlg80441cc = 1.0
        case 'TT':
            kitlg80441cc = 2.0
    return (vegfa634gg, vegfa634c, tp53gg, vegfa936cc, kitlg80441cc)
