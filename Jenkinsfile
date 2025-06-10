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
                                url: REPO_FRONT, 
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
                    docker build -t ./buffer-fork/fiberlaserfront .

                    docker build -t ./bufferManual/fiberlaserapi .
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
                        image: bufferAPI
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
                        image: bufferFront
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
