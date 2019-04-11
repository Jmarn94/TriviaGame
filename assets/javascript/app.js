var intervalID;
var trivia = {
    time: 15,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    writeq: 1,
    questions: {
        q1: {
            q: "Who was the first Cowboys Quarterback?",
            a: "Eddie LeBaron",
            c: ["Roger Stauback", "Eddie LeBaron", "Danny White", "Don Meredith"],
            img: "assets/images/eddie.jpg"
        },
        q2: {
            q: "Who was the franchises first draft pick?",
            a: "Bob Lilly",
            c: ["Bob Lilly", "Mel Renfro", "Walt Garrison", "Ed 'Too Tall' Jones"],
            img: "assets/images/BobLilly.jpg"
        },
        q3: {
        q: "Who is the All Time leader in receptions?",
        a: "Jason Witten",
        c: ["Michael Irvin", "Dez Bryant", "Drew Pearson", "Jason Witten"],
        img: "assets/images/jasonwitten.jpeg"
        },
        q4: {
            q: "Who is the All Time Touchdown passer?",
            a: "Tony Romo",
            c: ["Tony Romo", "Troy Aikman", "Roger Stauback","Drew Bledsole"],
            img: "assets/images/tony.jpeg"
        },
        q5: {
            q:"Who was the first Coach?",
            a: "Tom Landry",
            c: ["Jimmy Johnson", "Barry Switzer", "Tom Landry","Jason Garret"],
            img: "assets/images/landry.jpeg"
        },
        q6: {
            q: "What year did the franchise start?",
            a: "1960",
            c: ["1960", "1955", "1962", "1970"],
            img: "assets/images/cowboylogo.jpeg"
        }
    },
    start: function() {
        trivia.writeToDiv(trivia.writeq);
        intervalID = setInterval(trivia.count, 1000);
    },
    stop: function() {
        clearInterval(intervalID);
    },
    count: function(){
        trivia.time--;
        $("#time").html("Time Left: " + trivia.time);
        if (trivia.time === 0){
            trivia.stop();
            trivia.unanswered++;
            trivia.buffer();
        }
    },
    oblength: function() {
        return (Object.keys(trivia.questions).length);
    },
      writeToDiv: function(i) {
          var questions = $("<div>");
          questions.addClass("hideThis");
          var theQuestion = trivia.questions["q"+ i].q;
          var pone = $("<p id='questions'>").text(theQuestion);
          questions.append(pone);
          var randomChoice = trivia.questions["q" + i].c.sort(function() {
              return 0.5 - Math.random();
          });
          for (var n = 0; n < randomChoice.length; n++) {
              var choice = randomChoice[n];
              var choices = $("<buttons>").text(choice);
              choices.addClass("options");
              choices.attr("data-name", randomChoice[n]);
              questions.append(choices);
              questions.append("</br>")
          }
          $("#mainContent").html(questions);
      },
      scorer: function() {
        var userguess = $(this).data("name");
        trivia.stop();
        if (userguess == trivia.writeq["q" + trivia.writeq].a) {
            trivia.correct++;
            trivia.buffer();
        }else {
            trivia.incorrect++;
            trivia.buffer();
        }
      },
      buffer: function(){
          trivia.time = 15;
          $("#title").html("Time Left: " + trivia.time);
          var imgname = trivia.questions["q"+trivia.writeq].img;
          $("#mainContent").html("</br><p>Answer: " + trivia.questions["q" + trivia.writeq].a + "</p><p>Correct: " + trivia.correct + "</p><p>Unanswered: " + trivia.unanswered + trivia.unanswered + "</p></br><img id='previewpic' src="+imgname+">");
          trivia.writeq++;
          if (trivia.writeq <= (trivia.oblength())) {
              setTimeout(trivia.start, 1000*3);
          }
      },
      endgame: function() {
          $("#time").empty();
          $("#mainContent").html("</br><p>Total Scores!</p><p>Correct: " + trivia.correct + "</p><p>Incorrect: " + trivia.incorrect + "</p><p>Unanswered: " + trivia.unanswered + "</p>");
      }
    };
      window.onload = function() {
          $("#start").click(function() {
              $("#start").hide();
              $("#time").html("Time Left: " + trivia.time);
              trivia.start();
          });
          $("#mainContent").on("click", ".options", trivia.scorer);
      };
    
   
    
    
