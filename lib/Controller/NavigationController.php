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

namespace OCA\Circles\Controller;

use \OCA\Circles\Model\Circle;
use OCP\AppFramework\Http\TemplateResponse;

class NavigationController extends BaseController {


	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 * @NoSubAdminRequired
	 *
	 * @return TemplateResponse
	 */
	public function navigate() {
		$data = [
			'allowed_circles' => array(
				Circle::CIRCLES_PERSONAL => $this->configService->isCircleAllowed(
					Circle::CIRCLES_PERSONAL
				),
				Circle::CIRCLES_HIDDEN   => $this->configService->isCircleAllowed(
					Circle::CIRCLES_HIDDEN
				),
				Circle::CIRCLES_PRIVATE  => $this->configService->isCircleAllowed(
					Circle::CIRCLES_PRIVATE
				),
				Circle::CIRCLES_PUBLIC   => $this->configService->isCircleAllowed(
					Circle::CIRCLES_PUBLIC
				),
			)
		];

		return new TemplateResponse(
			'circles', 'navigate', $data
		);
	}


}