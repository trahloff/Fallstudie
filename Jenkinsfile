#!/usr/bin/groovy

// load pipeline functions
@Library('github.com/lachie83/jenkins-pipeline@v0.1')
def pipelineUtils = new io.estrado.Pipeline()


pipeline {
    agent { label 'taas-swarm-lon02' }
    /* ------------------- */
    stages {

        stage("Build") {
            agent {
                docker {
                  reuseNode true
                  image 'maven:3.5.0-jdk-8'
                }
            }

            steps {
                sh 'mvn -version'
            }
        }

    }

}
