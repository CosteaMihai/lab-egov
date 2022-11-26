const express = require('express');
const cors = require('cors');
const moment = require('moment');
const url = require('url');
const app = express();
const convert = require('xml-js');
app.use(express.json());
app.use(cors());
fs = require('fs');

const mysql = require('mysql');

// Creare conexiune cu baza de date
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e-gov-homework-1',
});

// Conectare la baza de date
db.connect((err) => {
    if (err) {
        console.log('Nu s-a putut realiza conexiunea la baza de date!');
        throw err;
    }
    console.log('Conexiunea la baza de date s-a realizat cu succes !');
});

app.post('/car-tax', (req, res) => {
    try {
        const jsonFormatedData = req.body.formatedData;
        const data = req.body.data;

        const xmlData = convert.json2xml(jsonFormatedData, {
            compact: true,
            spaces: 3,
        });

        fs.writeFile(
            `saved-data/car-tax/${data.firstName}_${data.lastName}_${
                data.registrationCarNumber
            }_${moment().format('DD_MM_YYYY_hh_mm')}.xml`,
            xmlData,
            function (err) {
                if (err) {
                    res.status(500).send('Probleme pe server!');
                    return;
                }
                console.log('Saved successfully');
            }
        );

        const sqlQuery =
            'INSERT INTO car_tax (firstName, lastName, carType, identityCardNumber, email, cylindricalCapacity, district, totalSum, registrationCarNumber, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
            sqlQuery,
            [
                data.firstName,
                data.lastName,
                data.carType.id,
                data.identityCardNumber,
                data.email,
                data.cylindricalCapacity,
                data.district.id,
                data.totalSum,
                data.registrationCarNumber,
                moment().format('YYYY-MM-DD'),
            ],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Eroare introducere date!');
                    return;
                }
                res.send(result);
            }
        );
    } catch (error) {
        res.status(500).send('Probleme pe server!');
    }
});

app.post('/driving-license-tax', (req, res) => {
    try {
        const jsonFormatedData = req.body.formatedData;
        const data = req.body.data;

        const xmlData = convert.json2xml(jsonFormatedData, {
            compact: true,
            spaces: 3,
        });

        fs.writeFile(
            `saved-data/driving-license/${data.firstName}_${
                data.lastName
            }_${moment().format('DD_MM_YYYY_hh_mm')}.xml`,
            xmlData,
            function (err) {
                if (err) {
                    res.status(500).send('Probleme pe server!');
                    return;
                }
                console.log('Saved successfully');
            }
        );

        const sqlQuery =
            'INSERT INTO driving_license_and_registration_certificate (firstName, lastName, identityCardNumber, email, actionType, totalSum, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
            sqlQuery,
            [
                data.firstName,
                data.lastName,
                data.identityCardNumber,
                data.email,
                data.actionType.id,
                data.totalSum,
                moment().format('YYYY-MM-DD'),
            ],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Eroare introducere date!');
                    return;
                }
                res.send(result);
            }
        );
    } catch (error) {
        res.status(500).send('Probleme pe server!');
    }
});

app.post('/passport-tax', (req, res) => {
    try {
        const jsonFormatedData = req.body.formatedData;
        const data = req.body.data;

        const xmlData = convert.json2xml(jsonFormatedData, {
            compact: true,
            spaces: 3,
        });

        fs.writeFile(
            `saved-data/passport-tax/${data.firstName}_${
                data.lastName
            }_${moment().format('DD_MM_YYYY_hh_mm')}.xml`,
            xmlData,
            function (err) {
                if (err) {
                    res.status(500).send('Probleme pe server!');
                    return;
                }
                console.log('Saved successfully');
            }
        );

        const sqlQuery =
            'INSERT INTO passport_tax (firstName, lastName, identityCardNumber, email, actionType, totalSum, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(
            sqlQuery,
            [
                data.firstName,
                data.lastName,
                data.identityCardNumber,
                data.email,
                data.actionType.id,
                data.totalSum,
                moment().format('YYYY-MM-DD'),
            ],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Eroare introducere date!');
                    return;
                }
                res.send(result);
            }
        );
    } catch (error) {
        res.status(500).send('Probleme pe server!');
    }
});

app.get('/regions', (req, res) => {
    try {
        const sqlQuery = 'SELECT * FROM regions';
        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Eroare preuluare date!');
                return;
            }

            res.send(result);
        });
    } catch (error) {
        res.status(500).send('Probleme pe server!');
    }
});

app.post('/region', (req, res) => {
    const data = req.body;
    const sqlQuery =
        'INSERT INTO regions (name, abr, percent) VALUES (?, ?, ?)';
    db.query(sqlQuery, [data.name, data.abr, data.percent], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Eroare introducere date!');
            return;
        }
        res.send(result);
    });
});

app.get('/dashboard-car-tax', (req, res) => {
    try {
        const queryParams = url.parse(req.url, true).query;

        startDate = queryParams.startDate;
        endDate = queryParams.endDate;

        const sqlQuery =
            'SELECT * FROM car_tax WHERE createdAt BETWEEN ? AND ?';

        db.query(sqlQuery, [startDate, endDate], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Eroare introducere date!');
                return;
            }

            const noOfDaysOfTheIntervel =
                moment(endDate).diff(moment(startDate), 'days') + 1;

            const carTypePieChart = new Array(4).fill(0);
            const cylindricalCapacityPieChart = new Array(5).fill(0);
            const transactionsPerDay = new Array(noOfDaysOfTheIntervel).fill(0);
            const sumPaidPerDay = new Array(noOfDaysOfTheIntervel).fill(0);
            const datesOfTheInterval = getDates(startDate, endDate);

            result.forEach((row) => {
                carTypePieChart[row.carType - 1]++;
                row.createdAt = moment(row.createdAt).format('YYYY-MM-DD');
                const indexOfDate = datesOfTheInterval.indexOf(row.createdAt);
                transactionsPerDay[indexOfDate]++;
                sumPaidPerDay[indexOfDate] += parseFloat(row.totalSum);
                if (row.carType === 1) {
                    if (row.cylindricalCapacity <= 1600) {
                        cylindricalCapacityPieChart[0]++;
                    }
                    if (
                        row.cylindricalCapacity > 1600 &&
                        row.cylindricalCapacity <= 2000
                    ) {
                        cylindricalCapacityPieChart[1]++;
                    }
                    if (
                        row.cylindricalCapacity > 2000 &&
                        row.cylindricalCapacity <= 2600
                    ) {
                        cylindricalCapacityPieChart[2]++;
                    }
                    if (
                        row.cylindricalCapacity > 2600 &&
                        row.cylindricalCapacity <= 3000
                    ) {
                        cylindricalCapacityPieChart[3]++;
                    }
                    if (row.cylindricalCapacity > 3000) {
                        cylindricalCapacityPieChart[4]++;
                    }
                }
            });
            res.send({
                data: result,
                carTypePieChart,
                cylindricalCapacityPieChart,
                transactionsPerDay,
                sumPaidPerDay,
                datesOfTheInterval,
            });
        });
    } catch (error) {
        res.status(500).send('Probleme pe server!');
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000...');
});

const getDates = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = moment(startDate);
    const endDateFormated = moment(endDate);
    while (currentDate <= endDateFormated) {
        dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
};
