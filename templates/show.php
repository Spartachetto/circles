<?php
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

script('teams', 'teams');

?>
<style>
	#loading-members {
		height: 50px;
		margin: 0 auto;
		padding: 20px;
	}
	#app-navigation .navigation-element {
		padding: 3px 12px;
	}
	#app-navigation .navigation-element input{
		width: 100%;
		box-sizing: border-box;
	}

	#app-content {
		padding: 3px 12px;
	}

	#app-navigation .header {
		padding: 0 12px;
		line-height: 44px;
		min-height: 44px;
		border-bottom: 1px solid #eee;
	}
</style>

<script type="text/template" id="list-template">
	<div class="navigation-element">
		<label for="new-team" class="hidden-visually"><?php p($l->t('New team')); ?></label>
		<input id="newteam" type="text" placeholder="<?php p($l->t('New team')); ?>" />
	</div>
	<ul class="teams">
		{{#each teams}}
		<li>
			<a data-id="{{id}}">{{name}}</a>
		</li>
		{{/each}}
	</ul>
</script>

<script type="text/template" id="member-list-template">
	<label for="add-member" class="hidden-visually"><?php p($l->t('Add team member')); ?></label>
	<input id="add-member" type="text" placeholder="<?php p($l->t('Add team member')); ?>" />

	<ul class="memberList">
		{{#each members}}
		<li>{{user_id}} - {{status}}</li>
		{{/each}}
	</ul>
</script>


<div id="app-navigation"></div>

<div id="app-content">
	<div id="emptycontent">
		<div class="icon-user"></div>
		<h2><?php p($l->t('No team selected')); ?></h2>
	</div>
	<div id="container" class="hidden"></div>

	<div id="loading-members" class="icon-loading hidden"></div>
</div>
