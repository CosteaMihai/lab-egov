<template>
    <form v-if="!backendResponse">
        <div class="form-row">
            <div class="form-group">
                <label for="">Prenume *</label>
                <input
                    type="text"
                    placeholder="Mihai Costin"
                    v-model.lazy="$v.form.firstName.$model"
                    @blur="$v.form.firstName.$touch()"
                />
                <div v-if="$v.form.firstName.$error" class="error-section">
                    <p class="error-message" v-if="!$v.form.firstName.required">
                        Acest camp este obligatoriu!
                    </p>
                    <p
                        class="error-message"
                        v-else-if="!$v.form.firstName.alpha"
                    >
                        Acest camp trebuie sa contina numai litere!
                    </p>
                    <p
                        class="error-message"
                        v-else-if="!$v.form.firstName.minLength"
                    >
                        Acest camp trebuie sa contina minim 3 caractere!
                    </p>
                </div>
            </div>
            <div class="form-group">
                <label for="">Nume *</label>
                <input
                    type="text"
                    placeholder="Costea"
                    v-model.lazy="$v.form.lastName.$model"
                    @blur="$v.form.lastName.$touch()"
                />
                <div v-if="$v.form.lastName.$error" class="error-section">
                    <p class="error-message" v-if="!$v.form.lastName.required">
                        Acest camp este obligatoriu!
                    </p>
                    <p
                        class="error-message"
                        v-else-if="!$v.form.firstName.alpha"
                    >
                        Acest camp trebuie sa contina numai litere!
                    </p>
                    <p
                        class="error-message"
                        v-else-if="!$v.form.lastName.minLength"
                    >
                        Acest camp trebuie sa contina minim 3 caractere!
                    </p>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="">CNP *</label>
                <input
                    type="text"
                    placeholder="1871203320216"
                    v-model.lazy="$v.form.identityCardNumber.$model"
                    @blur="$v.form.identityCardNumber.$touch()"
                />
                <div
                    v-if="$v.form.identityCardNumber.$error"
                    class="error-section"
                >
                    <p
                        class="error-message"
                        v-if="!$v.form.identityCardNumber.required"
                    >
                        Acest camp este obligatoriu!
                    </p>
                    <p
                        class="error-message"
                        v-else-if="!$v.form.identityCardNumber.numeric"
                    >
                        Acest camp trebuie sa contina numai cifre!
                    </p>
                    <p
                        class="error-message"
                        v-else-if="
                            !$v.form.identityCardNumber.minLength ||
                                !$v.form.identityCardNumber.maxLength
                        "
                    >
                        Acest camp trebuie sa contina exact 13 cifre!
                    </p>
                </div>
            </div>
            <div class="form-group">
                <label for="">E-mail *</label>
                <input
                    type="text"
                    placeholder="exemplu@exepmplu.ro"
                    v-model.lazy="$v.form.email.$model"
                    @blur="$v.form.email.$touch()"
                />
                <div v-if="$v.form.email.$error" class="error-section">
                    <p class="error-message" v-if="!$v.form.email.required">
                        Acest camp este obligatoriu!
                    </p>
                    <p class="error-message" v-else-if="!$v.form.email.email">
                        Acest camp trebuie sa fie in formatul email!
                    </p>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="">Tip plata *</label>
                <select
                    v-model.trim="$v.form.actionType.$model"
                    @blur="$v.form.actionType.$touch()"
                >
                    <option disabled value="">
                        Selectati un tip de plata
                    </option>
                    <option
                        v-for="option of actionTypeOptions"
                        :key="option.id"
                        :value="option"
                    >
                        {{ option.text }}
                    </option>
                </select>
                <div v-if="$v.form.actionType.$error" class="error-section">
                    <p
                        class="error-message"
                        v-if="!$v.form.actionType.required"
                    >
                        Acest camp este obligatoriu!
                    </p>
                </div>
            </div>

            <div class="form-group">
                <div class="total-box">
                    <div class="total-box-title">
                        Total de plata
                    </div>
                    <div class="total-box-value">
                        {{ total }}
                        {{ $v.form.actionType.$invalid ? '-' : ' lei' }}
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="accept-terms-and-conditions">
                <input
                    id="accept-terms-and-conditons"
                    type="checkbox"
                    v-model.lazy="$v.form.acceptTermsAndConditions.$model"
                    @blur="$v.form.acceptTermsAndConditions.$touch()"
                />
                <label for="accept-terms-and-conditons"
                    >Accept termenii si conditiile!</label
                >
            </div>
            <div
                v-if="$v.form.acceptTermsAndConditions.$error"
                class="error-section"
            >
                <p
                    style="transform: translateY(-15px);"
                    class="error-message"
                    v-if="!$v.form.acceptTermsAndConditions.required"
                >
                    Acest camp este obligatoriu!
                </p>
            </div>
        </div>
        <button class="button-submit" @click.prevent="pay()">
            Plateste
        </button>
    </form>
    <div v-else>
        <div v-if="backendResponse.status === 200" class="success-payment">
            <div class="title">
                Plata a fost efectuata cu succes!
            </div>
            <div class="buttons-group">
                <button class="button" @click.prevent="exportPDF()">
                    Descarca ordin de plata
                </button>
                <router-link class="button" to="/">
                    Alta plata
                </router-link>
            </div>
        </div>
        <div v-else class="fail-payment">
            <div class="title">
                Probleme intampinate pe server, va rugam incercati mai tarziu
            </div>
            <div class="buttons-group">
                <router-link class="button" to="/">
                    Alta plata
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import CarPaymentsService from '@/services/CarPaymentsService.js';
import {
    required,
    minLength,
    maxLength,
    alpha,
    email,
    numeric,
} from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            backendResponse: null,
            form: {
                firstName: null,
                lastName: null,
                identityCardNumber: null,
                email: null,
                actionType: '',
                totalSum: null,
                acceptTermsAndConditions: null,
            },
            actionTypeOptions: [
                {
                    id: 1,
                    text: 'Permise de conducere',
                    value: 1,
                },
                {
                    id: 2,
                    text: 'Certificate de inmatriculare',
                    value: 2,
                },
            ],
        };
    },

    methods: {
        async pay() {
            this.$v.form.$touch();
            if (this.$v.form.$invalid) return;
            this.form.totalSum = JSON.parse(JSON.stringify(this.total));
            const formCopy = Object.assign({}, this.form);
            delete formCopy.acceptTermsAndConditions;

            this.backendResponse = await CarPaymentsService.payDrivingLicenseTax(
                formCopy
            );
        },
        exportPDF() {
            CarPaymentsService.generatePDFforDrivingLicenseTax(this.form);
        },
    },

    computed: {
        total() {
            if (this.form.actionType.value === 1) {
                return 89;
            }

            if (this.form.actionType.value === 2) {
                return 49;
            }

            return null;
        },
    },

    validations: {
        form: {
            firstName: {
                required,
                minLength: minLength(3),
                alpha,
            },
            lastName: {
                required,
                minLength: minLength(3),
                alpha,
            },
            identityCardNumber: {
                required,
                minLength: minLength(13),
                maxLength: maxLength(13),
                numeric,
            },
            email: {
                required,
                email,
            },
            actionType: {
                required,
            },
            acceptTermsAndConditions: {
                required,
            },
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
}

form .form-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

form .form-row .form-group {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 45%;
}

form .form-row .form-group input {
    font-family: 'FF Tisa', Helvetica, Arial, sans-serif;
    border: none;
    border-bottom: 1px solid #2cb1bc;
    transition: 0.3 border-bottom;
    padding: 10px 10px;
    font-size: 16px;
    text-align: center;
}

form .form-row .form-group .total-box {
    background: #2cb1bc;
    border-radius: 3px;
    color: white;
    transform: translateY(2px);
    padding: 10px 0px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
        rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
        rgba(0, 0, 0, 0.07) 0px 16px 16px;
}

form .form-row .form-group input:focus {
    outline: none;
}

form .form-row .form-group select {
    font-family: 'FF Tisa', Helvetica, Arial, sans-serif;
    border: none;
    border-bottom: 1px solid #2cb1bc;
    transition: 0.3 border-bottom;
    padding: 10px 10px;
    font-size: 16px;
    text-align: center;
}

form .form-row .form-group select:focus {
    outline: none;
}

.error-message {
    color: red;
    font-size: 10px;
    margin-top: 1px;
}

.accept-terms-and-conditions {
    margin: 20px 0px;
}

form .button-submit {
    margin-top: 10px;
    background: #2cb1bc;
    border: none;
    padding: 10px 30px;
    color: white;
    border-radius: 3px;
    font-family: 'FF Tisa', Helvetica, Arial, sans-serif;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s opacity;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
        rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
        rgba(0, 0, 0, 0.07) 0px 16px 16px;
}

form .button-submit:focus {
    outline: none;
}

form .button-submit:hover {
    opacity: 0.8;
}

.success-payment {
    padding: 30px 0px;
}

.success-payment .title {
    font-size: 20px;
    color: #1cc61c;
}

.success-payment .buttons-group .button {
    background: #2cb1bc;
    border: none;
    padding: 5px 20px;
    color: white;
    border-radius: 3px;
    font-family: 'FF Tisa', Helvetica, Arial, sans-serif;
    font-size: 16px;
    cursor: pointer;
    margin-right: 20px;
    text-decoration: none;
}

.success-payment .buttons-group {
    margin: 20px 0px;
}

.fail-payment {
    padding: 30px 0px;
}

.fail-payment .title {
    font-size: 20px;
    color: red;
}

.fail-payment .buttons-group .button {
    background: #2cb1bc;
    border: none;
    padding: 5px 20px;
    color: white;
    border-radius: 3px;
    font-family: 'FF Tisa', Helvetica, Arial, sans-serif;
    font-size: 16px;
    cursor: pointer;
    margin-right: 20px;
    text-decoration: none;
}

.fail-payment .buttons-group {
    margin: 20px 0px;
}
</style>
