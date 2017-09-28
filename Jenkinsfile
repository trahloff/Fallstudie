#!/usr/bin/groovy

// load pipeline functions
// Requires pipeline-github-lib plugin to load library from github
@Library('github.com/lachie83/jenkins-pipeline@v0.1')
def pipeline = new io.estrado.Pipeline()

podTemplate(label: 'jenkins-pipeline', containers: [
    containerTemplate(name: 'jnlp', image: 'jenkinsci/jnlp-slave:latest', args: '${computer.jnlpmac} ${computer.name}', workingDir: '/home/jenkins', resourceRequestCpu: '200m', resourceLimitCpu: '200m', resourceRequestMemory: '256Mi', resourceLimitMemory: '256Mi'),
    containerTemplate(name: 'docker', image: 'docker:latest',       command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'node', image: 'jonbaldie/yarn:latest', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:latest', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:latest', command: 'cat', ttyEnabled: true)
],
volumes:[
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
]){

  node ('jenkins-pipeline') {

    def pwd = pwd()
    def chart_dir = "${pwd}/testapi-chart"

    checkout scm

    // read in required jenkins workflow config values
    def inputFile = readFile('Jenkinsfile.json')
    def config = new groovy.json.JsonSlurperClassic().parseText(inputFile)
    println "pipeline config ==> ${config}"

    // set additional git envvars for image tagging
    pipeline.gitEnvVars()

    // If pipeline debugging enabled
    if (config.pipeline.debug) {
      println "DEBUG ENABLED"
      sh "env | sort"

      println "Runing kubectl/helm tests"
      container('kubectl') {
        pipeline.kubectlTest()
      }
      container('helm') {
        pipeline.helmConfig()
      }
    }

    // tag image with version, and branch-commit_id
    def image_tags_map = pipeline.getContainerTags(config)

    // compile tag list
    def image_tags_list = pipeline.getMapValues(image_tags_map)

    stage ('install dependencies and test') {
      container('node') {

        sh "yarn && yarn test"

      }
    }

    stage ('test deployment') {
      container('helm') {

        // run helm chart linter
        pipeline.helmLint(chart_dir)

        // run dry-run helm chart installation
        pipeline.helmDeploy(
          dry_run       : true,
          name          : config.app.name,
          namespace     : config.app.name,
          version_tag   : image_tags_list.get(0),
          chart_dir     : chart_dir,
          replicas      : config.app.replicas,
          cpu           : config.app.cpu,
          memory        : config.app.memory,
          hostname      : config.app.hostname
        )

      }
    }


    // deploy only the master branch
    if (env.BRANCH_NAME == 'master') {
      stage ('deploy to k8s') {

        container('helm') {
          // Deploy using Helm chart
          pipeline.helmDeploy(
            dry_run       : false,
            name          : config.app.name,
            namespace     : config.app.name,
            version_tag   : image_tags_list.get(0),
            chart_dir     : chart_dir,
            replicas      : config.app.replicas,
            cpu           : config.app.cpu,
            memory        : config.app.memory,
            hostname      : config.app.hostname
          )
        }

      }
    }

  }
}
