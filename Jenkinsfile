pipeline {
    agent any

    stages {
        stage('Checkout Código') {
            steps {
                git branch: 'main', url: 'https://github.com/marcosfavoretti/BufferRestAPI.git' 
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('buffer-fork') {
                        bat 'docker build -t bufferapi:1.0 .'
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    // Rodar o container do backend
                    bat 'docker run -d -p 3691:3000 bufferapi'
                }
            }
        }

        stage('Build e Deploy Frontend') {
            steps {
                script {
                    dir('frontend') {
                        // Criar a imagem do frontend (para o XAMPP)
                        bat 'docker build -t BufferFrontEnd ./bufferManual'
                    }
                }
            }
        }

        stage('Finalizar') {
            steps {
                echo 'Frontend copiado para o XAMPP e Backend rodando no container.'
            }
        }
    }
}
