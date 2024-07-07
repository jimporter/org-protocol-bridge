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

browser.runtime.onMessage.addListener(async () => {
  return window.getSelection().toString();
});

function reportFeeds() {
  const feeds = Array.prototype.map.call(document.querySelectorAll(
    'link[rel="alternate"]:is([type*="rss" i], [type*="atom" i], [type*="feed" i])'
  ), (elem) => elem.href);
  browser.runtime.sendMessage({type: "feeds", feeds: feeds});
}

window.addEventListener("pageshow", reportFeeds);
reportFeeds();
