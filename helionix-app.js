// Helionix - Sistema de Análisis Químico con IA
// Archivo JavaScript principal

// Base de datos de elementos químicos
const elementos = {
    "1": {
        "nombre": "Hidrógeno",
        "simbolo": "H",
        "numero_atomico": 1,
        "masa_atomica": 1.008,
        "electronegatividad": 2.2,
        "categoria": "No metal",
        "info_adicional": "Elemento más abundante del universo"
    },
    "2": {
        "nombre": "Helio",
        "simbolo": "He",
        "numero_atomico": 2,
        "masa_atomica": 4.0026,
        "electronegatividad": 0.0,
        "categoria": "Gas noble",
        "info_adicional": "Gas para refrigeración"
    },
    "3": {
        "nombre": "Litio",
        "simbolo": "Li",
        "numero_atomico": 3,
        "masa_atomica": 6.94,
        "electronegatividad": 0.98,
        "categoria": "Metal alcalino",
        "info_adicional": "Usado en baterías recargables"
    },
    "4": {
        "nombre": "Berilio",
        "simbolo": "Be",
        "numero_atomico": 4,
        "masa_atomica": 9.0122,
        "electronegatividad": 1.57,
        "categoria": "Metal alcalinotérreo",
        "info_adicional": "Utilizado en materiales aeroespaciales"
    },
    "5": {
        "nombre": "Boro",
        "simbolo": "B",
        "numero_atomico": 5,
        "masa_atomica": 10.81,
        "electronegatividad": 2.04,
        "categoria": "Metaloide",
        "info_adicional": "Componente clave en vidrios resistentes"
    },
    "6": {
        "nombre": "Carbono",
        "simbolo": "C",
        "numero_atomico": 6,
        "masa_atomica": 12.011,
        "electronegatividad": 2.55,
        "categoria": "No metal",
        "info_adicional": "Base de la química orgánica"
    },
    "7": {
        "nombre": "Nitrógeno",
        "simbolo": "N",
        "numero_atomico": 7,
        "masa_atomica": 14.007,
        "electronegatividad": 3.04,
        "categoria": "No metal",
        "info_adicional": "Componente principal del aire terrestre"
    },
    "8": {
        "nombre": "Oxígeno",
        "simbolo": "O",
        "numero_atomico": 8,
        "masa_atomica": 15.999,
        "electronegatividad": 3.44,
        "categoria": "No metal",
        "info_adicional": "Esencial para la respiración celular"
    },
    "9": {
        "nombre": "Flúor",
        "simbolo": "F",
        "numero_atomico": 9,
        "masa_atomica": 18.998,
        "electronegatividad": 3.98,
        "categoria": "Halógeno",
        "info_adicional": "Elemento más reactivo de la tabla periódica"
    }
};

// Sistema de Inteligencia Artificial para clasificación de elementos
class HelionixAI {
    /**
     * Predice la clasificación de un elemento basado en sus propiedades
     * @param {number} numeroAtomico - Número atómico del elemento
     * @param {number} masaAtomica - Masa atómica del elemento
     * @param {number} electronegatividad - Electronegatividad del elemento
     * @returns {string} Clasificación predictiva del elemento
     */
    predict(numeroAtomico, masaAtomica, electronegatividad) {
        // Gases nobles
        if (electronegatividad === 0.0) return "Gas noble";
        
        // Lantánidos
        if (numeroAtomico >= 57 && numeroAtomico <= 71) return "Lantánido";
        
        // Actínidos
        if (numeroAtomico >= 89 && numeroAtomico <= 103) return "Actínido";
        
        // No metales (alta electronegatividad)
        if (electronegatividad > 2.5) return "No metal";
        
        // Metales alcalinos (baja electronegatividad, números atómicos bajos)
        if (electronegatividad < 1.2 && numeroAtomico < 20) return "Metal alcalino";
        
        // Metales de transición
        if (numeroAtomico >= 21 && numeroAtomico <= 30) return "Metal de transición";
        
        // Metaloides (electronegatividad intermedia)
        if (electronegatividad > 1.8 && electronegatividad < 2.2) return "Metaloide";
        
        // Metales post-transición
        if (numeroAtomico > 80) return "Metal post-transición";
        
        // Por defecto: Metal de transición
        return "Metal de transición";
    }
}

// Clase principal de la aplicación Helionix
class HelionixApp {
    constructor() {
        this.ai = new HelionixAI();
        this.qrScanner = null;
        this.currentAudio = null;
        this.initializeEventListeners();
        this.logSystemInfo();
    }

    /**
     * Inicializa todos los event listeners de la aplicación
     */
    initializeEventListeners() {
        // Botones principales
        document.getElementById('scanBtn').addEventListener('click', () => this.toggleScanner());
        document.getElementById('periodicBtn').addEventListener('click', () => this.togglePeriodicTable());
        
        // Controles del escáner
        document.getElementById('startScanBtn').addEventListener('click', () => this.startScanner());
        document.getElementById('stopScanBtn').addEventListener('click', () => this.stopScanner());
        
        // Control de audio
        document.getElementById('playAudioBtn').addEventListener('click', () => this.playElementAudio());
        
        // Limpieza al cerrar la ventana
        window.addEventListener('beforeunload', () => this.cleanup());
        
        // Log de inicio
        window.addEventListener('load', () => this.logSystemInfo());
    }

    /**
     * Alterna la visibilidad del contenedor del escáner QR
     */
    toggleScanner() {
        const container = document.getElementById('scannerContainer');
        const btn = document.getElementById('scanBtn');
        
        if (container.classList.contains('active')) {
            container.classList.remove('active');
            btn.classList.remove('active');
            this.stopScanner();
        } else {
            this.hideAllContainers();
            container.classList.add('active');
            btn.classList.add('active');
        }
    }

    /**
     * Alterna la visibilidad de la tabla periódica
     */
    togglePeriodicTable() {
        const table = document.getElementById('periodicTable');
        const btn = document.getElementById('periodicBtn');
        
        if (table.style.display === 'grid') {
            table.style.display = 'none';
            btn.classList.remove('active');
        } else {
            this.hideAllContainers();
            this.createPeriodicTable();
            table.style.display = 'grid';
            btn.classList.add('active');
        }
    }

    /**
     * Oculta todos los contenedores activos
     */
    hideAllContainers() {
        document.getElementById('scannerContainer').classList.remove('active');
        document.getElementById('periodicTable').style.display = 'none';
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        this.stopScanner();
    }

    /**
     * Inicia el escáner QR con manejo avanzado de errores
     */
    async startScanner() {
        try {
            const video = document.getElementById('video');
            const status = document.getElementById('scanStatus');
            const startBtn = document.getElementById('startScanBtn');
            const stopBtn = document.getElementById('stopScanBtn');
            
            status.textContent = "Solicitando acceso a la cámara...";
            status.className = "status";
            
            // Verificar disponibilidad de QrScanner
            if (typeof QrScanner === 'undefined') {
                throw new Error('QrScanner no está cargado');
            }
            
            // Verificar compatibilidad de cámara
            const hasCamera = await QrScanner.hasCamera();
            if (!hasCamera) {
                throw new Error('No se detectó cámara en el dispositivo');
            }
            
            // Configurar escáner QR
            this.qrScanner = new QrScanner(
                video,
                result => this.handleQRResult(result, status, video),
                {
                    onDecodeError: error => this.handleDecodeError(error),
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    maxScansPerSecond: 5,
                    preferredCamera: 'environment'
                }
            );

            await this.qrScanner.start();
            
            status.textContent = "🎯 Cámara activa - Apunte hacia un código QR";
            status.className = "status success";
            
            startBtn.style.display = 'none';
            stopBtn.style.display = 'inline-flex';
            
        } catch (error) {
            this.handleScannerError(error);
        }
    }

    /**
     * Maneja el resultado del escaneo QR
     * @param {Object} result - Resultado del escáner QR
     * @param {HTMLElement} status - Elemento de estado
     * @param {HTMLElement} video - Elemento de video
     */
    handleQRResult(result, status, video) {
        const elementId = parseInt(result.data);
        console.log('QR detectado:', result.data);
        
        if (elementos[elementId]) {
            this.processElement(elementId);
            status.textContent = `✅ Elemento ${elementId} (${elementos[elementId].nombre}) detectado`;
            status.className = "status success";
            
            // Feedback visual
            this.showVisualFeedback(video);
            
        } else {
            status.textContent = `❌ Código QR "${result.data}" no corresponde a un elemento disponible`;
            status.className = "status error";
        }
    }

    /**
     * Proporciona feedback visual al usuario
     * @param {HTMLElement} video - Elemento de video
     */
    showVisualFeedback(video) {
        video.style.borderColor = 'var(--primary-green)';
        setTimeout(() => {
            video.style.borderColor = 'var(--gray-200)';
        }, 1000);
    }

    /**
     * Maneja errores de decodificación QR
     * @param {Error} error - Error de decodificación
     */
    handleDecodeError(error) {
        // Solo mostrar errores importantes
        if (error.message && !error.message.includes('No QR code found')) {
            console.warn('Error de decodificación:', error);
        }
    }

    /**
     * Maneja errores del escáner
     * @param {Error} error - Error del escáner
     */
    handleScannerError(error) {
        console.error('Error del escáner:', error);
        const status = document.getElementById('scanStatus');
        
        const errorMessages = {
            'NotAllowedError': "❌ Acceso a la cámara denegado. Permita el acceso en la configuración del navegador",
            'NotFoundError': "❌ No se encontró cámara en el dispositivo",
            'NotSupportedError': "❌ Cámara no compatible con este navegador"
        };
        
        status.textContent = errorMessages[error.name] || `❌ Error: ${error.message}`;
        status.className = "status error";
    }

    /**
     * Detiene el escáner QR
     */
    stopScanner() {
        const startBtn = document.getElementById('startScanBtn');
        const stopBtn = document.getElementById('stopScanBtn');
        const status = document.getElementById('scanStatus');
        
        if (this.qrScanner) {
            this.qrScanner.stop();
            this.qrScanner.destroy();
            this.qrScanner = null;
        }
        
        status.textContent = "📷 Cámara desactivada";
        status.className = "status";
        
        startBtn.style.display = 'inline-flex';
        stopBtn.style.display = 'none';
    }

    /**
     * Crea la tabla periódica interactiva
     */
    createPeriodicTable() {
        const table = document.getElementById('periodicTable');
        table.innerHTML = '';
        
        Object.keys(elementos).forEach(elementId => {
            const element = elementos[elementId];
            const cell = document.createElement('div');
            cell.className = 'element-cell';
            cell.innerHTML = `
                <div class="number">${element.numero_atomico}</div>
                <div class="symbol">${element.simbolo}</div>
            `;
            cell.addEventListener('click', () => this.processElement(parseInt(elementId)));
            table.appendChild(cell);
        });
    }

    /**
     * Procesa y muestra información de un elemento
     * @param {number} elementId - ID del elemento
     */
    processElement(elementId) {
        const element = elementos[elementId];
        if (!element) return;

        // Generar predicción IA
        const aiPrediction = this.ai.predict(
            element.numero_atomico,
            element.masa_atomica,
            element.electronegatividad
        );

        // Actualizar interfaz
        this.updateElementInfo(element, aiPrediction);
        
        // Mostrar panel de información
        document.getElementById('elementInfo').classList.add('active');
    }

    /**
     * Actualiza la información del elemento en la interfaz
     * @param {Object} element - Datos del elemento
     * @param {string} aiPrediction - Predicción de IA
     */
    updateElementInfo(element, aiPrediction) {
        const updates = {
            'elementSymbol': element.simbolo,
            'elementName': element.nombre,
            'elementAtomicNumber': `Z = ${element.numero_atomico}`,
            'elementMass': `${element.masa_atomica} u`,
            'elementElectronegativity': element.electronegatividad,
            'elementCategory': element.categoria,
            'aiCategory': aiPrediction,
            'elementAdditionalInfo': element.info_adicional
        };

        Object.entries(updates).forEach(([id, content]) => {
            document.getElementById(id).textContent = content;
        });
    }

    /**
     * Reproduce audio del elemento usando síntesis de voz
     */
    playElementAudio() {
        // Detener audio actual si existe
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

        // Obtener información del elemento
        const elementInfo = this.getElementInfoForAudio();
        
        if ('speechSynthesis' in window) {
            this.speakElementInfo(elementInfo);
        } else {
            alert('Síntesis de voz no disponible. Contenido: ' + elementInfo);
        }
    }

    /**
     * Obtiene la información del elemento para audio
     * @returns {string} Texto para síntesis de voz
     */
    getElementInfoForAudio() {
        const elementName = document.getElementById('elementName').textContent;
        const elementSymbol = document.getElementById('elementSymbol').textContent;
        const atomicNumber = document.getElementById('elementAtomicNumber').textContent;
        const category = document.getElementById('elementCategory').textContent;
        const additionalInfo = document.getElementById('elementAdditionalInfo').textContent;

        return `Análisis Helionix: Elemento ${elementName}, símbolo ${elementSymbol}, ${atomicNumber}, clasificación ${category}. ${additionalInfo}`;
    }

    /**
     * Ejecuta la síntesis de voz
     * @param {string} text - Texto a sintetizar
     */
    speakElementInfo(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }

    /**
     * Limpia recursos al cerrar la aplicación
     */
    cleanup() {
        this.stopScanner();
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
    }

    /**
     * Registra información del sistema en consola
     */
    logSystemInfo() {
        console.log('Helionix - Sistema iniciado');
        console.log(`Base de datos: ${Object.keys(elementos).length} elementos`);
        console.log('Sistema de IA: Activo');
        console.log('Módulos cargados: Escáner QR, Tabla Periódica, Síntesis de Voz');
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.helionixApp = new HelionixApp();
});

// Exportar para uso en otros módulos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HelionixApp, HelionixAI, elementos };
}