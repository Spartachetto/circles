/**
 * @copyright Copyright (c) 2017 Morris Jobke <hey@morrisjobke.de>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * @copyright Copyright (c) 2016 Morris Jobke <hey@morrisjobke.de>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

(function() {

	OCA.Teams = _.extend(OCA.Teams || {}, {
		availableTeams: [],
	});

	/**
	 * 888b     d888               888          888
	 * 8888b   d8888               888          888
	 * 88888b.d88888               888          888
	 * 888Y88888P888  .d88b.   .d88888  .d88b.  888 .d8888b
	 * 888 Y888P 888 d88""88b d88" 888 d8P  Y8b 888 88K
	 * 888  Y8P  888 888  888 888  888 88888888 888 "Y8888b.
	 * 888   "   888 Y88..88P Y88b 888 Y8b.     888      X88
	 * 888       888  "Y88P"   "Y88888  "Y8888  888  88888P'
	 */

	/**
	 * @class OCA.Teams.Team
	 */
	OCA.Teams.Team =
		OC.Backbone.Model.extend({
			defaults: {
				'id': 0,
				'name': '',
				'owner': '',
				'status': ''
			}
		});

	/**
	 * @class OCA.Teams.TeamMember
	 */
	OCA.Teams.TeamMember =
		OC.Backbone.Model.extend({
			defaults: {
				'user_id': '',
				'status': ''
			}
		});

	/**
	 *  .d8888b.           888 888                   888    d8b
	 * d88P  Y88b          888 888                   888    Y8P
	 * 888    888          888 888                   888
	 * 888         .d88b.  888 888  .d88b.   .d8888b 888888 888  .d88b.  88888b.  .d8888b
	 * 888        d88""88b 888 888 d8P  Y8b d88P"    888    888 d88""88b 888 "88b 88K
	 * 888    888 888  888 888 888 88888888 888      888    888 888  888 888  888 "Y8888b.
	 * Y88b  d88P Y88..88P 888 888 Y8b.     Y88b.    Y88b.  888 Y88..88P 888  888      X88
	 *  "Y8888P"   "Y88P"  888 888  "Y8888   "Y8888P  "Y888 888  "Y88P"  888  888  88888P'
	 */

	/**
	 * @class OCA.Teams.TeamCollection
	 *
	 * collection of all teams
	 */
	OCA.Teams.TeamCollection =
		OC.Backbone.Collection.extend({
			model: OCA.Teams.Team,
			url: OC.generateUrl('apps/teams/teams')
		});

	/**
	 * @class OCA.Teams.TeamMemberCollection
	 *
	 * collection of team member
	 */
	OCA.Teams.TeamMemberCollection =
		OC.Backbone.Collection.extend({
			model: OCA.Teams.TeamMember,
			initialize: function(models, options) {
				this.url = OC.generateUrl('apps/teams/teams/{id}/members', {id: options.id});
				return this;
			},
		});

	/**
	 * 888     888 d8b
	 * 888     888 Y8P
	 * 888     888
	 * Y88b   d88P 888  .d88b.  888  888  888 .d8888b
	 *  Y88b d88P  888 d8P  Y8b 888  888  888 88K
	 *   Y88o88P   888 88888888 888  888  888 "Y8888b.
	 *    Y888P    888 Y8b.     Y88b 888 d88P      X88
	 *     Y8P     888  "Y8888   "Y8888888P"   88888P'
	 */

	/**
	 * @class OCA.Teams.TemplateView
	 *
	 * a generic template that handles the Handlebars template compile step
	 * in a method called "template()"
	 */
	OCA.Teams.TemplateView =
		OC.Backbone.View.extend({
			_template: null,
			template: function(vars) {
				if (!this._template) {
					this._template = Handlebars.compile($(this.templateId).html());
				}
				return this._template(vars);
			}
		});

	/**
	 * @class OCA.Teams.ListView
	 *
	 * this creates the view for navigation menu
	 */
	OCA.Teams.ListView =
		OCA.Teams.TemplateView.extend({
			templateId: '#list-template',
			events: {
				'click a': 'openTeam'
			},
			initialize: function() {
				this.render();
			},
			openTeam: function(event) {
				var $listElement = $(event.target);
				$listElement.addClass('active');

				var teamId = $listElement.data('id');
				var teamMembers = new OCA.Teams.TeamMemberCollection(null, {id: teamId});
				$('#emptycontent').addClass('hidden');
				$('#loading-members').removeClass('hidden');
				teamMembers.fetch({
					success: function() {
						new OCA.Teams.MemberListView({
							el: '#container',
							collection: teamMembers
						});
					}
				});

				// TODO show team
			},
			render: function() {
				this.$el.html(this.template({
					teams: this.collection.toJSON()
				}));

				return this.$el;
			}
		});

	/**
	 * @class OCA.Teams.MemberListView
	 *
	 * this creates the view for member lis
	 */
	OCA.Teams.MemberListView =
		OCA.Teams.TemplateView.extend({
			templateId: '#member-list-template',
			events: {
				'keydown #new-team': 'addTeam'
			},
			initialize: function() {
				this.render();
				this.$el.removeClass('hidden');
				$('#loading-members').addClass('hidden');
			},
			render: function() {
				this.$el.html(this.template({
					members: this.collection.toJSON()
				}));

				return this.$el;
			},
			addTeam: function() {
				console.log('addTeam', arguments);
			}
		});

})();

$(document).ready(function() {
	var teams = new OCA.Teams.TeamCollection();
	teams.fetch({
		success: function() {
			new OCA.Teams.ListView({
				el: '#app-navigation',
				collection: teams
			});
		}
	});
});
/*


$(document).ready(function() {
	var removeMember = function() {
		var teamId = $('#app-navigation').find('.active').first().data('navigation'),
			memberId = $(this).data('user_id');

		$.ajax({
			method: 'DELETE',
			url: OC.linkTo('teams', 'teams/' + teamId + '/members'),
			data: {
				userId: memberId
			}
		}).done(function() {
			// TODO re-render in JS
			location.reload();
		}).fail(function(){
			// TODO on failure
		});
	};

	var openTeam = function() {
		var teamId = $(this).data('navigation');
		$('#app-navigation').find('.active').removeClass('active');
		$(this).addClass('active');

		$('#emptycontent').addClass('hidden');
		$('#loading_members').removeClass('hidden');
		$('#container').addClass('hidden');
		$('#container').find('.memberList').empty();

		$.get(
			OC.linkTo('teams', 'teams/' + teamId + '/members'),
			[],
			function(result) {
				$('#loading_members').addClass('hidden');

				var $memberList = $('#container').find('.memberList');

				_.each(result.members, function(member){
					$memberList.append(
						$('<li>')
							.data('user_id', member.user_id)
							.text(member.user_id + ' (' + member.status + ')')
							.on('click', removeMember)
					);
				});

				$('#container').removeClass('hidden');
			}
		).fail(function(){
			// TODO on failure
			$('#loading_members').addClass('hidden');
			$('#emptycontent').removeClass('hidden');
		});
	};

	$('#app-navigation').find('a').on('click', openTeam);

	$.get(
		OC.linkTo('teams', 'teams'),
		[],
		function(result) {
			$navigation = $('#app-navigation');
			$teamsNavigation = $navigation.find('.teams');

			$teamsNavigation.append(
				$('<li>').addClass('header').text('My teams')
			);

			_.each(result.myTeams, function(team){
				$teamsNavigation.append(
					$('<li>').append(
						$('<a>').data('navigation', team.id).append(
							$('<span>').addClass('no-icon').text(team.name)
						).on('click', openTeam)
					)
				);
			});


			$teamsNavigation.append(
				$('<li>').addClass('header').text('Other teams')
			);

			_.each(result.otherTeams, function(team){
				$teamsNavigation.append(
					$('<li>').append(
						$('<a>').data('navigation', team.id).append(
							$('<span>').addClass('no-icon').text(team.name + ' by ' + team.owner + ' (' + team.status + ')')
						).on('click', openTeam)
					)
				);
			});
		}
	).fail(function(){
		// TODO on failure
	});

	var createTeam = function(e){
		if (e.keyCode === 13) {
			$.ajax({
				method: 'PUT',
				url: OC.linkTo('teams', 'teams'),
				data: {
					name: $('#newTeam').val()
				}
			}).done(function() {
				// TODO re-render in JS
				location.reload();
			}).fail(function(){
				// TODO on failure
			});
		}
	};

	$('#newTeam').on('keyup', createTeam);



	var addMember = function(e){
		if (e.keyCode === 13) {
			var teamId = $('#app-navigation').find('.active').first().data('navigation');

			$.ajax({
				method: 'PUT',
				url: OC.linkTo('teams', 'teams/' + teamId + '/members'),
				data: {
					userId: $('#addMember').val()
				}
			}).done(function() {
				// TODO re-render in JS
				location.reload();
				$('#addMember').val('');
			}).fail(function(){
				// TODO on failure
			});
		}
	};

	$('#addMember').on('keyup', addMember);



});*/