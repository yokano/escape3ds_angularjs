/**
 * デバッグページのスクリプト
 * @file
 */
$(function() {
	// ユーザの追加
	$('#add_user .submit').click(function() {
		var div = $('#add_user')
		var data = {};
		data.user_type = div.find('.user_type option:selected').val();
		data.user_name = div.find('.user_name').val();
		data.user_pass = div.find('.user_pass').val();
		data.user_mail = div.find('.user_mail').val();
		data.user_oauth_id = div.find('.user_oauth_id').val();
		
		$.ajax('/add_user', {
			method: 'POST',
			data: data,
			error: function() {
				console.log('error');
			},
			success: function() {
				console.log('success');
			}
		});
	});
	
	// ログイン
	$('#login .submit').click(function() {
		var div = $('#login');
		var data = {};
		data.mail = div.find('.mail').val();
		data.pass = div.find('.password').val();
		
		$.ajax('/login', {
			method: 'POST',
			data: data,
			dataType: 'json',
			error: function(xhr, status) {
				console.log(status);
			},
			success: function(data) {
				if(data.result == false) {
					alert(data.message);
				} else {
					location.href = data.to;
				}
			}
		});
	});
	
	// 仮登録ユーザ
	$('#interim_users .register').click(function() {
		var selected = $('#interim_users option:selected');
		var key = selected.val();
		$.ajax('/registration', {
			method: 'GET',
			data: {
				key: key
			},
			success: function() {
				update();
			},
			error: function() {
				console.log('registration error');
			}
		});
	});
	
	// ゲーム追加
	$('#add_game').click(function() {
		var name = $('#game_title').val();
		var description = $('#game_description').val();
		$.ajax('/add_game', {
			method: 'POST',
			data: {
				game_name: name,
				game_description: description,
				user_key: $('#users option:selected').val()
			},
			success: function() {
				console.log('success add game');
			},
			error: function() {
				console.log('error add game');
			}
		});
	});
	
	// セッション作成
	$('#start_session').click(function() {
		var session = $('#session');
		var mail = session.find('.mail').val();
		var pass = session.find('.pass').val();
		$.ajax('/start_session', {
			method: 'POST',
			dataType: 'json',
			data: {
				mail: mail,
				pass: pass
			},
			success: function() {
				console.log('成功');
			},
			error: function() {
				console.log('error');
			}
		});
	});
	
	// データの更新
	var update = function() {
		var interimUsers = $('#interim_users');
		$.ajax('/get_interim_users', {
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				var select = interimUsers.find('select');
				select.empty();
				for(var key in data) {
					var option = $('<option></option>').html(data[key]).val(key);
					select.append(option);
				}
			},
			error: function() {
				console.log('interim user error');
			}
		});
		
		var users = $('#users select');
		$.ajax('/get_users', {
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				users.empty();
				for(var key in data) {
					var option = $('<option></option>').html(data[key]).val(key);
					users.append(option);
				}
			},
			error: function() {
				console.log('user error');
			}
		});
	};
	
	update();
});
