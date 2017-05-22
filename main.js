var mqtt = require('mqtt')
var sys = require('sys')
var exec = require('child_process').exec;

//load config from properties file 
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./app.properties');
var mqtt_topic_name = properties.get('mqtt.topic.name')
var mqtt_connection_retry_interval = properties.get('mqtt.connect.retry.interval')
var mqtt_server_ip =  properties.get('mqtt.server.ip');
var mqtt_publish_interval = properties.get('mqtt.publish.interval')

var child;
var temperature_command = "/opt/vc/bin/vcgencmd measure_temp | /usr/bin/cut -c6-9"

function measure_temperature_data_and_send(){
	sys.print('measureing cpu temperature' );
	child = exec(temperature_command, function (error, stdout, stderr) {
	  sys.print('stdout: ' + stdout);
	  var temperature_data = stdout;
	  sys.print('stderr: ' + stderr);
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  }else{
	  	client.publish(mqtt_topic_name, temperature_data)
	  }
	  setTimeout(measure_temperature_data_and_send, 1000 * mqtt_publish_interval);
	});
}

//actual code. start with connecting to mqtt server . if unable to, keep retrying at an interval 
sys.print('Connecting to MQTT + stdout');
var client  = mqtt.connect("mqtt://"+mqtt_server_ip)

client.on('connect', function () {
  sys.print('Connected to mqtt server ' + mqtt_server_ip);	
  measure_temperature_data_and_send(); 
})


