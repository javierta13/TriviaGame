/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

var main = function () 
{ 
	'use strict';
    	var url = 'http://localhost:3000/';

	var get = function (choice) 
    	{
        	//getQuestion
        	if(choice === 1)
        	{       	
        		url += 'getQuestion';
            		$.ajax(
            		{
            			url: url, 
            			type: 'GET',
                		data: '',
                		success: function(data)
                		{
                    			$('#trivia-question').val(data.question);
                    			$('#id').val(data.id);
                		}
            		});
            		url = 'http://localhost:3000/';
        	}        
        	else
        	{
            		//getScore       	
        		url += 'getScore';
            
            		$.ajax(
            		{
            			url: url, 
            			type: 'GET',
                		data: '',
                		success: function(data)
                		{
                    			$('#right').val(data.right);
                    			$('#wrong').val(data.wrong);
                		}
            		});
            		url = 'http://localhost:3000/';
        	}
	};

	var post = function (choice) 
    	{
        	//postQuestion
        	if(choice === 1)
        	{
			var newQuestion;
			var newAnswer;        	
        		url += 'postQuestion';

            		newQuestion = $('#new-question').val();
            		newAnswer = $('#new-answer').val();
            
            		$.ajax(
            		{
            			url: url, 
            			type: 'post',
                		dataType: 'json',
                		data: JSON.stringify({"question": newQuestion, "answer": newAnswer }),
                		contentType: 'application/json',
                		success: function(data)
                		{
                    			alert(data.success);
                		}
            		});
            		url = 'http://localhost:3000/';
        	}
        	//postAnswer        
        	else
        	{
        		url += 'postAnswer';        	
        		var possibleAnswer,
                	questionID;

            		possibleAnswer = $('#possible-answer').val();
            		questionID = $('#question-id').val();
            		$.ajax(
            		{
            			url: url, 
            			type: 'post',
                		dataType: 'json',
                		data: JSON.stringify({"answer": possibleAnswer, "id": questionID }),
                		contentType: 'application/json',
                		success: function(data)
                		{
                    			$('#result').val(data.result);
                		}
            		});
            		url = 'http://localhost:3000/';
        	}
	};

	$('.get-question button').on('click', function (event) {
    		get(1);
	});

    	$('.post-question button').on('click', function (event) {
        	post(1);
        	$('.post-question input').val("");
    	});

    	$('.post-answer button').on('click', function (event) {
        	post(2);
        	$('#possible-answer').val("");
        	$('#question-id').val("");
    	});

    	$('.get-score button').on('click', function (event) {
        	get(2);
    	});
};

$(document).ready(main);
