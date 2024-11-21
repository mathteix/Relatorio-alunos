const form = document.getElementById('report-form');
const reportsContainer = document.getElementById('reports');

// Função para carregar relatórios do LocalStorage
function loadReports() {
  return JSON.parse(localStorage.getItem('reports')) || [];
}

// Função para salvar relatórios no LocalStorage
function saveReports(reports) {
  localStorage.setItem('reports', JSON.stringify(reports));
}

// Função para exibir relatórios
function displayReports() {
  const reports = loadReports();
  reportsContainer.innerHTML = '';

  reports.forEach((report, index) => {
    const reportDiv = document.createElement('div');
    reportDiv.classList.add('report');
    reportDiv.innerHTML = `
      <h3>${report.type === 'individual' ? 'Relatório Individual' : 'Relatório da Turma'}</h3>
      <p><strong>Aluno:</strong> ${report.name}</p>
      <p><strong>Turma:</strong> ${report.class}</p>
      <p><strong>Professor(a):</strong> ${report.teacher}</p>
      <p><strong>Data:</strong> ${report.date}</p>
      <p>${report.text}</p>
      <button onclick="deleteReport(${index})">Excluir</button>
      <button class="print-btn" onclick="printReport(${index})">Imprimir</button>
    `;
    reportsContainer.appendChild(reportDiv);
  });
}

// Função para adicionar relatório
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const studentName = document.getElementById('student-name').value;
  const reportType = document.getElementById('report-type').value;
  const reportText = document.getElementById('report-text').value;
  const className = document.getElementById('class').value;
  const teacherName = document.getElementById('teacher-name').value;

  const newReport = {
    name: studentName,
    type: reportType,
    text: reportText,
    class: className,
    teacher: teacherName,
    date: new Date().toLocaleString(),
  };

  const reports = loadReports();
  reports.push(newReport);
  saveReports(reports);

  form.reset();
  displayReports();
});

// Função para excluir relatório
function deleteReport(index) {
  const reports = loadReports();
  reports.splice(index, 1);
  saveReports(reports);
  displayReports();
}

// Função para imprimir relatório
function printReport(index) {
  const reports = loadReports();
  const report = reports[index];

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Relatório</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 2rem; }
          h1 { color: #ff7f11; }
          p { margin: 1rem 0; }
        </style>
      </head>
      <body>
        <h1>${report.type === 'individual' ? 'Relatório Individual' : 'Relatório da Turma'}</h1>
        <p><strong>Aluno:</strong> ${report.name}</p>
        <p><strong>Turma:</strong> ${report.class}</p>
        <p><strong>Professor(a):</strong> ${report.teacher}</p>
        <p><strong>Data:</strong> ${report.date}</p>
        <p>${report.text}</p>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// Carregar relatórios ao iniciar
document.addEventListener('DOMContentLoaded', displayReports);
