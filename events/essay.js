const Essay = require('../models/essay');
const User = require('../models/user');

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('socket ', socket.id, 'is being connected')
        socket.on('disconnect', function () {
            console.log('socket ', socket.id, ' is being disconnected')
        })

        socket.on('categorize', async (data) => {
            let selectedCat = data.data
            let where = []
            let isSelected = false
            for (let i = 0; i < selectedCat.length; i++) {
                if (selectedCat[i]) {
                    where.push(i + 1) //jobs는 AI로 1부터 시작
                    isSelected = true
                }
            }
            let essays

            if (isSelected) {
                essays = await Essay.findAll({
                    where: {
                        job_id: where
                    },
                    include: [
                        {
                            model: User,
                            attributes: ['path', 'username'],
                        }
                    ],
                    raw: true,
                    order: [["essay_id", "DESC"]]
                })
            } else {
                essays = await Essay.findAll({
                    include: [
                        {
                            model: User,
                            attributes: ['path', 'username'],
                        }
                    ],
                    raw: true,
                    order: [["essay_id", "DESC"]]
                })
            }


            //
            socket.emit('render category', { essays, jobs })
        })
    })
}

const jobs = {
    1: {
        en: 'game',
        kr: '게임'
    },
    2: {
        en: 'big_data',
        kr: '빅데이터'
    },
    3: {
        en: 'front',
        kr: '프론트엔드'
    },
    4: {
        en: 'back',
        kr: '백엔드'
    },
    5: {
        en: 'security',
        kr: '보안'
    },
    6: {
        en: 'edu',
        kr: '교육자'
    },
    7: {
        en: 'embedded',
        kr: '임베디드'
    },
    8: {
        en: 'desktop',
        kr: '데스크탑'
    },
    9: {
        en: 'mobile',
        kr: '모바일'
    }
}