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
                    sh '''
                    cd APPLICATION
                    cd buffer-fork
                    docker build -t bufferapi .
                    cd ../bufferManual
                    docker build -t bufferfront .
                    '''
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                script {
                    writeFile file: 'docker-compose.yml', text: '''
                    version: '3'
                    services:
                      serviceA:
                        image: bufferapi
                        build:
                          context: ./APPLICATION/buffer-fork
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
                      serviceB:
                        image: bufferfront
                        build:
                          context: ./APPLICATION/bufferManual
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
