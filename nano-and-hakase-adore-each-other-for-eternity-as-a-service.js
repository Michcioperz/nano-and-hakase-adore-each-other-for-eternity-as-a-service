//  nano-and-hakase-adore-each-other-for-eternity-as-a-service is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//  
//  nano-and-hakase-adore-each-other-for-eternity-as-a-service is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//  
//  You should have received a copy of the GNU General Public License
//  along with nano-and-hakase-adore-each-other-for-eternity-as-a-service.  If not, see <http://www.gnu.org/licenses/>.


let omgstop = false

let sheet = document.createElement('link')
sheet.rel = 'stylesheet'
sheet.href = 'style.css'
document.body.appendChild(sheet)

let convo = document.createElement('div')
document.body.appendChild(convo)

let nanohead = document.createElement('div')
nanohead.classList.add('floating-head')
nanohead.classList.add('nano')
convo.appendChild(nanohead)

let hakasehead = document.createElement('div')
hakasehead.classList.add('floating-head')
hakasehead.classList.add('hakase')
convo.appendChild(hakasehead)

function sanityCleanup() {
  let elems = convo.children
  if (elems.length < 12) {
    return
  }
  let lastElem = elems[elems.length - 1]
  let viewportHeight = window.innerHeight
  if (lastElem.getBoundingClientRect().top > viewportHeight) {
    // something is off the screen and we must find out what is
    // we should keep about 12 messages in there regardless
    let lastOnScreen = 10
    let firstOffScreen = elems.length - 1
    // TODO: figure this out properly
  }
}

function basicSanityCleanup() {
  let elems = convo.children
  if (elems.length < 24) {
    return
  }
  Array.from(elems).slice(24).forEach((e) => convo.removeChild(e))
}

setInterval(basicSanityCleanup, 2000)

function nextAffiliation() {
  let msgs = convo.querySelectorAll('.message')
  if (msgs.length >= 6) {
    let importantMsg = msgs[5]
    if (importantMsg.classList.contains('hakase')) {
      return 'nano'
    }
  }
  return 'hakase'
}

function spawnFromHell() {
  if (omgstop) return
  let speaker = nextAffiliation()
  let msgw = document.createElement('div')
  msgw.classList.add('message-wrapper')
  let msg = document.createElement('span')
  msg.classList.add('message')
  msgw.appendChild(msg)
  if (speaker === 'nano') {
    msg.appendChild(document.createTextNode('Hakase!'))
    msgw.classList.add('nano')
    msg.classList.add('nano')
    nanohead.parentNode.removeChild(nanohead)
    msgw.insertBefore(nanohead, msgw.firstChild)
  } else {
    msg.appendChild(document.createTextNode('Nano!'))
    msgw.classList.add('hakase')
    msg.classList.add('hakase')
    hakasehead.parentNode.removeChild(hakasehead)
    msgw.insertBefore(hakasehead, msgw.firstChild)
  }
  convo.insertBefore(msgw, convo.firstChild)
}

setInterval(spawnFromHell, 400)
