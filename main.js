prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width: 350,
    height:300,
    image_format: 'jpg',
    jpg_quality:80
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:' , ml5.version);

abc = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VslSblvwc/model.json' ,modelReady);

function modelReady(){
    console.log ('Model Loaded!');
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    utterThis.rate = 1.5;
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    abc.classify(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
       
        prediction_1 = results[0].label;
       
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";

        }
        if(results[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        
        
    }
}