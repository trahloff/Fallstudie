pipeline {
    agent { label 'taas-swarm-lon02' }
    stages {

      /* ------------------------------------------------- */
        stage("Build") {
            agent { docker { image 'node:latest' } }
            steps {
              sh 'npm install'
             }
        }

      /* ------------------------------------------------- */
        stage("Test") {
            agent { docker { image 'node:latest' } }
            steps {
              sh 'node test'
             }
        }

      /* ------------------------------------------------- */
        stage("Build & Push Docker Image") {
            agent { docker { image 'docker:latest' } }
            steps {
              echo "washsk"
             }
        }

    }
}
