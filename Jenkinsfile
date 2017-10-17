// #!/usr/bin/groovy

// load pipeline functions
@Library('github.com/lachie83/jenkins-pipeline@v0.1')
def pipelineUtils = new io.estrado.Pipeline()

// read in required jenkins workflow config values
def inputFile = readFile('Jenkinsfile.json')
def config = new groovy.json.JsonSlurperClassic().parseText(inputFile)
println "pipeline config ==> ${config}"


pipeline {
    agent { label 'taas-swarm-lon02' }
    stages {

      /* ------------------------------------------------- */
        stage("Build") {
            agent { docker { image 'yarn:latest' } }
            steps { sh 'yarn' }
        }

      /* ------------------------------------------------- */
        stage("Test") {
            agent { docker { image 'yarn:latest' } }
            steps { sh 'yarn test' }
        }

    }
}
