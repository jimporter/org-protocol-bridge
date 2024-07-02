/*
 * This file is part of org-protocol-bridge.
 *
 * org-protocol-bridge is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * org-protocol-bridge is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * org-protocol-bridge. If not, see <https://www.gnu.org/licenses/>.
 */
"use strict";

function query_url(base, params) {
  let url = new URL(base);
  url.search = new URLSearchParams(params);
  return url.href;
}

browser.browserAction.onClicked.addListener(async (tab, event) => {
  let url;
  if(event.button === 0) {
    url = query_url('org-protocol://store-link', {
      url: tab.url,
      title: tab.title,
    });
  } else {
    url = query_url('org-protocol://capture', {
      template: 'P',
      url: tab.url,
      title: tab.title,
      body: await browser.tabs.sendMessage(tab.id, {}),
    });
  }

  browser.tabs.update({url});
});
