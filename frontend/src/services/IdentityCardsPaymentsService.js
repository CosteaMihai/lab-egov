import { apiClient } from '../main';
import { jsPDF } from 'jspdf';
import NProgress from 'nprogress';

const payPassportTax = async (form) => {
    try {
        const formatedData = formatDataForPassportTaxForXML(form);

        return await apiClient.post('passport-tax', {
            data: form,
            formatedData,
        });
    } catch (error) {
        NProgress.done();
        return error;
    }
};

const generatePDFforPassportTax = (form) => {
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

const formatDataForPassportTaxForXML = (object) => {
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

export default {
    payPassportTax,
    generatePDFforPassportTax,
};
