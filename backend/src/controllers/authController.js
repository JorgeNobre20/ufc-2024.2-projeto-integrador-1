require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../config/database');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.signUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, isVerified: true });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const url = `http://localhost:${process.env.PORT}/auth/verify-email?token=${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirme seu e-mail',
            html: `<p>Clique no link para confirmar seu e-mail: <a href="${url}">${url}</a></p>`
        });

        res.status(201).json({ message: 'Usuário cadastrado. Verifique seu e-mail para ativar a conta.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' });

        if (!user.isVerified) return res.status(403).json({ error: 'Confirme seu e-mail antes de fazer login' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido', token, userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await User.update({ isVerified: true }, { where: { id: decoded.id } });

        res.json({ message: 'E-mail verificado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Token inválido ou expirado' });
    }
};
