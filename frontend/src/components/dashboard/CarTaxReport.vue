<template>
    <div class="car-tax-report-container">
        <div class="filter-container">
            <div class="dates-section">
                <date-picker
                    placeholder="Data de inceput"
                    :lang="lang"
                    v-model="startDate"
                    valueType="format"
                    format="YYYY-MM-DD"
                    @change="clearData()"
                >
                </date-picker>
                <date-picker
                    placeholder="Data de sfarsit"
                    :lang="lang"
                    v-model="endDate"
                    valueType="format"
                    format="YYYY-MM-DD"
                    @change="clearData()"
                >
                </date-picker>
            </div>
            <button v-if="areDatesValid" @click.prevent="getData()">
                Filtreaza datele
            </button>
        </div>

        <div
            class="report-container"
            v-if="areDatesValid && !isLoading && carTaxDashboard"
        >
            <div class="header-text">Detalii impozite masini</div>
            <div class="chart-container">
                <div class="chart-container-header">Plati efectuate pe zi</div>
                <div id="chart-car-taxes-per-day"></div>
            </div>
            <div class="chart-container">
                <div class="chart-container-header">
                    Sume platite pe zi
                </div>
                <div id="chart-sum-paid-per-day"></div>
            </div>

            <div
                class="pie-chart-container"
                v-if="
                    isValidCarTypePieChart && isValidCylindricalCapacityPieChart
                "
            >
                <div class="pie-chart">
                    <div class="pie-chart-header">
                        Plati in functie de tipul de automobil ({{
                            carTypeTotal
                        }})
                    </div>
                    <div id="pie-chart-car-type"></div>
                </div>
                <div class="pie-chart">
                    <div class="pie-chart-header">
                        Plati in functie de capacitatea cilindrica ({{
                            cylindricalCapacityTotal
                        }})
                    </div>
                    <div id="pie-chart-cylindrical-capacity"></div>
                </div>
            </div>

            <table
                id="reporting-table"
                class="report-table"
                v-if="carTaxDashboard.data.length"
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name si Prenume</th>
                        <th>Email</th>
                        <th>Capacitate cilindrica</th>
                        <th>Suma platita</th>
                        <th>Numar de inmatriculare</th>
                        <th>Data de plata</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in carTaxDashboard.data"
                        :key="index"
                    >
                        <td>{{ item.id }}</td>
                        <td>{{ item.firstName + ' ' + item.lastName }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.cylindricalCapacity }}</td>
                        <td>{{ item.totalSum }}</td>
                        <td>{{ item.registrationCarNumber }}</td>
                        <td>{{ item.createdAt }}</td>
                    </tr>
                </tbody>
            </table>

            <button
                v-if="isValidCarTypePieChart"
                class="generate-report-btn"
                @click.prevent="downloadReort()"
            >
                Genereaza raport
            </button>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ro';
import VueApexCharts from 'vue-apexcharts';
import { mapActions, mapGetters } from 'vuex';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default {
    components: { DatePicker, apexchart: VueApexCharts },
    data() {
        return {
            startDate: null,
            endDate: null,
            chartCarTaxesPerDay: null,
            chartSumPaidPerDay: null,
            pieChartCarType: null,
            pieChartCylindricalCapacity: null,
            carTaxDashboardCopy: this.carTaxDashboard,
            lang: {
                formatLocale: {
                    firstDayOfWeek: 1,
                },
                monthBeforeYear: false,
            },
        };
    },
    destroyed() {
        this.clearData();
    },
    methods: {
        async getData() {
            const data = await this.getCarTaxDashboard({
                startDate: this.startDate,
                endDate: this.endDate,
            });

            this.chartCarTaxesPerDay = new ApexCharts(
                document.getElementById('chart-car-taxes-per-day'),
                {
                    ...this.chartOptionsTransactionsPerDay,
                    series: this.seriesTransactionsPerDay,
                }
            );

            this.chartCarTaxesPerDay.render();

            this.chartSumPaidPerDay = new ApexCharts(
                document.getElementById('chart-sum-paid-per-day'),
                {
                    ...this.chartOptionsSumPaidPerDay,
                    series: this.seriesSumPaidPerDay,
                }
            );

            this.chartSumPaidPerDay.render();

            this.pieChartCarType = new ApexCharts(
                document.getElementById('pie-chart-car-type'),
                {
                    ...this.chartOptionsCarType,
                    series: this.seriesCarType,
                }
            );

            this.pieChartCarType.render();

            this.pieChartCylindricalCapacity = new ApexCharts(
                document.getElementById('pie-chart-cylindrical-capacity'),
                {
                    ...this.chartOptionsCylindricalCapacity,
                    series: this.seriesCylindricalCapacity,
                }
            );

            this.pieChartCylindricalCapacity.render();
        },
        clearData() {
            this.clearData();
        },
        downloadReort() {
            let doc = new jsPDF();
            doc.addFont('ArialMS', 'Arial', 'normal');
            doc.setFont('Arial');

            doc.text(
                15,
                20,
                `Detalii impozite masini ( ${this.startDate} - ${this.endDate} )`
            );

            doc.setFontSize(12);

            this.chartCarTaxesPerDay.dataURI().then(({ imgURI, blob }) => {
                doc.text(15, 35, `Plati efectuate pe zi`);
                doc.addImage(imgURI, 'PNG', 15, 40, 180, 60);

                this.chartSumPaidPerDay.dataURI().then(({ imgURI, blob }) => {
                    doc.text(15, 120, `Sume platite pe zi`);

                    doc.addImage(imgURI, 'PNG', 15, 125, 180, 60);

                    this.pieChartCarType.dataURI().then(({ imgURI, blob }) => {
                        doc.text(
                            15,
                            205,
                            `Plati in functie de tipul de automobil (${this.carTypeTotal})`
                        );

                        doc.addImage(imgURI, 'PNG', 15, 210, 85, 75);

                        this.pieChartCylindricalCapacity
                            .dataURI()
                            .then(({ imgURI, blob }) => {
                                doc.text(
                                    115,
                                    205,
                                    `Plati in functie de capacitatea cilindrica (${this.cylindricalCapacityTotal})`
                                );

                                doc.addImage(imgURI, 'PNG', 115, 210, 85, 75);

                                doc.addPage();

                                doc.autoTable({
                                    html: '#reporting-table',
                                    theme: 'plain',
                                    headStyles: {
                                        fillColor: [44, 176, 188],
                                        textColor: [255, 255, 255],
                                    },
                                    styles: { halign: 'center' },
                                });

                                doc.save();
                            });
                    });
                });
            });
        },
        ...mapActions('dashboard', ['getCarTaxDashboard', 'clearData']),
    },
    computed: {
        areDatesValid() {
            return (
                this.startDate && this.endDate && this.startDate <= this.endDate
            );
        },
        chartOptionsTransactionsPerDay() {
            return {
                colors: ['#2cb1bc'],
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                fill: {
                    colors: ['#2cb1bc'],
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#2cb1bc'],
                    },
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    categories: this.carTaxDashboard.datesOfTheInterval,
                },
                tooltip: {
                    x: {
                        format: 'yy/MM/dd',
                    },
                },
            };
        },
        seriesTransactionsPerDay() {
            return [
                {
                    name: 'Plati',
                    data: this.carTaxDashboard.transactionsPerDay,
                },
            ];
        },
        chartOptionsSumPaidPerDay() {
            return {
                colors: ['#2cb1bc'],
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                fill: {
                    colors: ['#2cb1bc'],
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#2cb1bc'],
                    },
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    categories: this.carTaxDashboard.datesOfTheInterval,
                },
                tooltip: {
                    x: {
                        format: 'yy/MM/dd',
                    },
                },
            };
        },
        seriesSumPaidPerDay() {
            return [
                {
                    name: 'Suma Platita',
                    data: this.carTaxDashboard.sumPaidPerDay,
                },
            ];
        },
        chartOptionsCarType() {
            return {
                chart: {
                    width: 450,
                    height: 450,
                    type: 'pie',
                },
                labels: [
                    'Automobile',
                    'Autobuz, autocar, microbuz',
                    'Tractor',
                    'Motocicleta si motoreta',
                ],
                theme: {
                    monochrome: {
                        enabled: true,
                        color: '#2cb1bc',
                        shadeTo: 'light',
                        shadeIntensity: 0.8,
                    },
                },
                legend: {
                    position: 'bottom',
                },
            };
        },
        seriesCarType() {
            return this.carTaxDashboard.carTypePieChart;
        },
        chartOptionsCylindricalCapacity() {
            return {
                chart: {
                    width: 450,
                    height: 450,
                    type: 'pie',
                },
                labels: [
                    'sub 1600',
                    'intre 1601 si 2000',
                    'intre 2001 si 2600',
                    'intre 2601 si 3000',
                    'peste 3000',
                ],
                theme: {
                    monochrome: {
                        enabled: true,
                        color: '#2cb1bc',
                        shadeTo: 'light',
                        shadeIntensity: 0.8,
                    },
                },
                legend: {
                    position: 'bottom',
                },
            };
        },
        seriesCylindricalCapacity() {
            return this.carTaxDashboard.cylindricalCapacityPieChart;
        },
        cylindricalCapacityTotal() {
            return this.carTaxDashboard.cylindricalCapacityPieChart.reduce(
                (a, b) => a + b,
                0
            );
        },
        carTypeTotal() {
            return this.carTaxDashboard.carTypePieChart.reduce(
                (a, b) => a + b,
                0
            );
        },
        isValidCarTypePieChart() {
            return !this.carTaxDashboard.carTypePieChart.every(
                (item) => item === 0
            );
        },
        isValidCylindricalCapacityPieChart() {
            return !this.carTaxDashboard.cylindricalCapacityPieChart.every(
                (item) => item === 0
            );
        },
        ...mapGetters('dashboard', ['isLoading', 'carTaxDashboard']),
    },
};
</script>

<style scoped>
.car-tax-report-container {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 30px auto;
}

.car-tax-report-container .filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.car-tax-report-container .filter-container .dates-section > * {
    margin-right: 20px;
}

.car-tax-report-container .filter-container button,
.generate-report-btn {
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

.car-tax-report-container .filter-container:focus {
    outline: none;
}

.report-container {
    margin-top: 50px;
}

.report-container .header-text {
    font-size: 25px;
    margin-bottom: 50px;
    font-weight: 700;
}

.chart-container {
    margin-top: 30px;
    border-radius: 3px;
    background: #2cb1bc;
    padding: 40px 10px 10px 10px;
}

.chart-container .chart-container-header {
    color: white;
    font-size: 19px;
    text-align: left;
    transform: translateY(-20px);
}

#chart-car-taxes-per-day,
#chart-sum-paid-per-day {
    background: white;
}

.pie-chart-container {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pie-chart {
    background: #f0f0f0;
    padding: 50px;
    border-radius: 3px;
}

.pie-chart-header {
    margin-bottom: 10px;
    color: #2cb1bc;
}

table {
    margin-top: 50px;
    width: 100%;
}

table td,
table th {
    padding: 8px;
    font-size: 14px;
}

table tr:nth-child(even) {
    background-color: #f2f2f2;
}

table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #2cb1bc;
    color: white;
}

.generate-report-btn {
    margin-top: 50px;
}
</style>
