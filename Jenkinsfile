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
                    dir('backend') {
                        bat 'docker build -t BufferAPI:1.0 ./buffer-fork .'
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    // Rodar o container do backend
                    bat 'docker run -d --name BufferAPI -p 3691:3000 BufferAPI'
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
