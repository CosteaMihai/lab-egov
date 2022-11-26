import { apiClient } from '../main';
import { jsPDF } from 'jspdf';
import NProgress from 'nprogress';

const payCarTax = async (form) => {
    try {
        const formatedData = formatDataForCarTaxForXML(form);

        return await apiClient.post('car-tax', { data: form, formatedData });
    } catch (error) {
        NProgress.done();
        return error;
    }
};

const payDrivingLicenseTax = async (form) => {
    try {
        const formatedData = formatDataForDrivingLicenseTaxForXML(form);

        return await apiClient.post('driving-license-tax', {
            data: form,
            formatedData,
        });
    } catch (error) {
        NProgress.done();
        return error;
    }
};

const generatePDFforDrivingLicenseTax = (form) => {
    const doc = new jsPDF();

    doc.text('Factura', 100, 10);
    doc.text(`Subsemntatul: ${form.lastName} ${form.firstName}`, 10, 20);
    doc.text(`Email: ${form.email}`, 10, 30);
    doc.text(`CNP: ${form.identityCardNumber}`, 10, 40);
    doc.text(`Tipul platii: ${form.actionType.text}`, 10, 50);
    doc.text(`Suma platita: ${form.totalSum} lei`, 10, 60);
    doc.save(
        `Factura_${form.firstName}_${form.lastName}_${form.actionType.text}.pdf`
    );
};

const generatePDFforCarTax = (form) => {
    const doc = new jsPDF();

    doc.text('Factura', 100, 10);
    doc.text(`Subsemntatul: ${form.lastName} ${form.firstName}`, 10, 20);
    doc.text(`Email: ${form.email}`, 10, 30);
    doc.text(`CNP: ${form.identityCardNumber}`, 10, 40);
    doc.text(`Tip autovehicul: ${form.carType.text}`, 10, 50);
    doc.text(
        `Numarul de inmatriculare al masinii: ${form.registrationCarNumber}`,
        10,
        60
    );
    doc.text(`Capacitate cilindrica: ${form.cylindricalCapacity} cm`, 10, 70);
    doc.text(`Impozit anual: ${form.totalSum} lei`, 10, 80);
    doc.save(
        `Factura_${form.firstName}_${form.lastName}_${form.registrationCarNumber}.pdf`
    );
};

const formatDataForCarTaxForXML = (object) => {
    return {
        _declaration: {
            _attributes: {
                version: '1.0',
                encoding: 'utf-8',
            },
        },
        payer: {
            firstName: {
                _text: object.firstName,
            },
            lastName: {
                _text: object.lastName,
            },
            email: {
                _text: object.email,
            },
            identityCardNumber: {
                _text: object.identityCardNumber,
            },
            district: {
                _text: object.district.name,
            },
            totalSum: {
                _text: object.totalSum,
            },
            vehicle: {
                registrationCarNumber: {
                    _text: object.registrationCarNumber,
                },
                cylindricalCapacity: {
                    _text: object.cylindricalCapacity,
                },
                carType: {
                    _text: object.carType.text,
                },
            },
        },
    };
};

const formatDataForDrivingLicenseTaxForXML = (object) => {
    return {
        _declaration: {
            _attributes: {
                version: '1.0',
                encoding: 'utf-8',
            },
        },
        payment: {
            firstName: {
                _text: object.firstName,
            },
            lastName: {
                _text: object.lastName,
            },
            email: {
                _text: object.email,
            },
            identityCardNumber: {
                _text: object.identityCardNumber,
            },
            actionType: {
                _text: object.actionType.text,
            },
            totalSum: {
                _text: object.totalSum,
            },
        },
    };
};

const getAllCarTaxes = async (startDate, endDate) => {
    try {
        return await apiClient.get(
            'dashboard-car-tax?startDate=' + startDate + '&endDate=' + endDate
        );
    } catch (error) {
        NProgress.done();
        return error;
    }
};

export default {
    payCarTax,
    payDrivingLicenseTax,
    generatePDFforCarTax,
    generatePDFforDrivingLicenseTax,
    getAllCarTaxes,
};
