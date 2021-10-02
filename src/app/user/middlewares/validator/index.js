exports.signUp = (req, res, next) => {
    req.check('email', 'valid emaill address required')
        .matches(/.+\@.+\..+/)
        .withMessage('valid emaill address required')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
        .matches(/\d/).withMessage('Password must contain a number');
    req.check('phone')
        .isLength({ min: 10 }).withMessage('phone number must contain at least 10 0r 11 characters')
        .matches(/\d/).withMessage('phone number must contain a number');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.signIn = (req, res, next) => {
    req.check('login', 'email or phone number required').notEmpty();
    req.check('password', 'Password is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.activate = (req, res, next) => {
    req.check('token', 'token is required').notEmpty();
    req.check('token')
        .isLength({ min: 3 }).withMessage('token must contain at least 3 digit')
        .matches(/\d/).withMessage('token must be a number');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};



