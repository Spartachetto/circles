<?php
/**
 * Circles - Bring cloud-users closer together.
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Maxence Lange <maxence@pontapreta.net>
 * @copyright 2017
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

namespace OCA\Circles\Db;

use \OCA\Circles\Model\Member;
use OCP\AppFramework\Db\Entity;

class Members extends Entity {


	public $circleId;
	public $userId;
	public $level;
	public $status;
	public $note;
	public $joined;

	public function __construct(Member $item = null) {
		if ($item != null) {
			$this->setCircleId($item->getCircleId());
			$this->setUserId($item->getUserId());
			$this->setLevel($item->getLevel());
			$this->setStatus($item->getStatus());
			$this->setNote($item->getNote());
			$this->setJoined($item->getJoined());
		}
	}

	/**
	 * @return Member
	 */
	public function toModel() {
		$member = new Member();

		$member->setCircleId($this->getCircleId());
		$member->setUserId($this->getUserId());
		$member->setLevel($this->getLevel());
		$member->setStatus($this->getStatus());
		$member->setNote($this->getNote());
		$member->setJoined($this->getJoined());

		return $member;
	}
}

