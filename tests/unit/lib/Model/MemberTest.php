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

namespace OCA\Circles\Tests\Model;

use \OCA\Circles\Model\Member;


/**
 * Class MemberTest
 *
 * @package OCA\Circles\Tests\Model
 */
class MemberTest extends \PHPUnit_Framework_TestCase {

	public function testConst() {

		$this->assertSame(0, Member::LEVEL_NONE);
		$this->assertSame(1, Member::LEVEL_MEMBER);
		$this->assertSame(6, Member::LEVEL_MODERATOR);
		$this->assertSame(8, Member::LEVEL_ADMIN);
		$this->assertSame(9, Member::LEVEL_OWNER);

		$this->assertSame('Unknown', Member::STATUS_NONMEMBER);
		$this->assertSame('Invited', Member::STATUS_INVITED);
		$this->assertSame('Requesting', Member::STATUS_REQUEST);
		$this->assertSame('Member', Member::STATUS_MEMBER);
		$this->assertSame('Blocked', Member::STATUS_BLOCKED);
		$this->assertSame('Kicked', Member::STATUS_KICKED);
	}

	public function testModel() {

		$date = date("Y-m-d H:i:s");

		$member = new Member();
		$member->fromArray(
			array(
				'circle_id' => 1,
				'user_id'   => 'test',
				'level'     => Member::LEVEL_OWNER,
				'status'    => Member::STATUS_MEMBER,
				'note'      => 'test note',
				'joined'    => $date
			)
		);

		$this->assertSame(1, $member->getCircleId());
		$this->assertSame('test', $member->getUserID());
		$this->assertSame(Member::LEVEL_OWNER, $member->getLevel());
		$this->assertSame(Member::STATUS_MEMBER, $member->getStatus());
		$this->assertSame('test note', $member->getNote());
		$this->assertSame($date, $member->getJoined());
		$this->assertSame('Owner', $member->getLevelString());
	}
}
