pipeline {
    agent any

    environment {
        REPO = 'https://github.com/marcosfavoretti/BufferRestAPI.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // REMOVIDO o 'dir('APPLICATION')'.
                // Agora o repositório é clonado na raiz do workspace,
                // que é o comportamento padrão e mais simples.
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: REPO,
                        credentialsId: 'github-ssh-key' // Garanta que esta credencial existe
                    ]]
                ])
            }
        }

        stage('Build Docker Images') {
            steps {
                // Os caminhos agora são diretos, sem 'APPLICATION/'
                dir('buffer-fork') {
                    sh 'docker build -t bufferapi .'
                }
                dir('bufferManual') {
                    sh 'docker build -t bufferfront .'
                }
            }
        }

        stage('Run Services with Docker Compose') {
            steps {
                script {
                    // CORRIGIDO: Sintaxe do environment e indentação de ports.
                    // Os caminhos do 'context' agora estão corretos.
                    writeFile file: 'docker-compose.yml', text: '''
version: '3.8'
services:
  backend:
    image: bufferapi
    build:
      context: ./buffer-fork
    ports:
      - "${PORT}:${PORT}"
    environment:
      - MYSQLDATABASEUSER=${MYSQLDATABASEUSER}
      - MYSQLDATABASEHOST=${MYSQLDATABASEHOST}
      - MYSQLDATABASEDATABASE=${MYSQLDATABASEDATABASE}
      - MYSQLPORT=${MYSQLPORT}
      - MYSQLDATABASENHA=${MYSQLDATABASENHA}
      - EXCELFILE=${EXCELFILE}
      - SEARCHDIR=${SEARCHDIR}
      - HOST=${HOST}
      - PORT=${PORT}
    restart: always
    volumes:
      - /mnt/compartilhamento_rede:/app/dados_rede
    
  frontend:
    image: bufferfront
    build:
      context: ./bufferManual
    ports:
      - "8082:80"
    restart: always
'''
                    sh "docker-compose up -d --build"
                }
            }
        }
    }

}