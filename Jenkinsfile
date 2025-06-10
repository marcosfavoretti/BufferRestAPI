pipeline {
    agent any

    environment {
        REPO = 'https://github.com/marcosfavoretti/BufferRestAPI.git'
    }

    stages {
        stage('Clone Repositories') {
            steps {
                script {
                    dir('APPLICATION') {
                        checkout([ 
                            $class: 'GitSCM', 
                            branches: [[name: '*/main']], 
                            userRemoteConfigs: [[ 
                                url: REPO, 
                                credentialsId: 'github-ssh-key' 
                            ]]
                        ])
                    }
                }
            }
        }

       stage('Build Docker Images') {
            steps {
                script {
                    echo "Construindo a imagem do Back-end..."
                    // Entra na pasta do back-end e constrói a imagem
                    dir('buffer-fork') { // <-- SUBSTITUA PELO NOME DA SUA PASTA BACK-END
                        sh 'docker build -t bufferapi .'
                    }

                    echo "Construindo a imagem do Front-end..."
                    // Entra na pasta do front-end e constrói a imagem
                    dir('bufferManual') { // <-- SUBSTITUA PELO NOME DA SUA PASTA FRONT-END
                        sh 'docker build -t bufferfront .'
                    }
                }
            }
        }
        stage('Docker Compose Up') {
            steps {
                script {
                    writeFile file: 'docker-compose.yml', text: '''
                    version: '3'
                    services:
                      backend:
                        image: bufferapi
                        build:
                          context: ./buffer-fork
                        environment:
                            MYSQLDATABASEUSER: ${MYSQLDATABASEUSER}
                            MYSQLDATABASEHOST: ${MYSQLDATABASEHOST}
                            MYSQLDATABASEDATABASE: ${MYSQLDATABASEDATABASE}
                            MYSQLPORT: ${MYSQLPORT}
                            MYSQLDATABASENHA: ${MYSQLDATABASENHA}
                            EXCELFILE = ${EXCELFILE}
                            SEARCHDIR = ${SEARCHDIR}
                            HOST = ${HOST}
                            PORT: ${PORT}
                        ports:
                          - "${PORT}:${PORT}"
                          - "${TCPPORT}:${TCPPORT}"
                          - "${WSPORT}:${WSPORT}"
                        restart: always
                      front:
                        image: bufferfront
                        build:
                          context: ./bufferManual
                        ports:
                          - "8082:80"
                        restart: always
                    '''
                    // Rodar o docker-compose usando variáveis de ambiente
                    sh """
                    docker-compose up -d
                    """
                }
            }
        }
    }
}
