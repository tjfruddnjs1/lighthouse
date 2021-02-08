const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const Drop = require('../models/drop');

const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// upload 폴더 생성
try{
    fs.readdirSync('public/images/user_image');        
}catch(error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('public/images/user_image');
}

// 파일 관리 
const upload = multer({
    storage: multer.diskStorage({
        destination(req,file, done){
            done(null, 'public/images/user_image');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : {fileSize : 5 * 1024 * 1024},
});


//계정 설정 page get/post
router.get('/account',isLoggedIn,(req,res,next)=>{
    try{
        res.render('mypage/account');
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/account',isLoggedIn, upload.single('upload'), async(req,res,next)=>{
    const { email, username, phone, gender} = req.body;

    try{
        const hasUserEmail = await User.findOne({
            where : {
                email
            }
        });
        if((req.user.email !== email) && hasUserEmail){
            return res.render('home/validate', {title:'중복 메일', passAuth : false, passLogin:true});
        }

        if(! req.file || ! req.file.path){
        await User.update({
                email : email,
                username : username,
                phone : phone,
                gender : gender,
        },{
                where:{id : req.user.id},
        });
        }else{
            let path = req.file.path;
            path = path.replace('public','');
            
            await User.update({
                email : email,
                username : username,
                phone : phone,
                gender : gender,
                path : path,
        },{
                where:{id : req.user.id},
        });
        }   

        res.send(
            "<script>alert('정보가 수정 되었습니다.'); history.back();</script>"
        );
        
    }catch(err){
        console.error(err);
        next(err);
    }
});


//계정 삭제 get,post
router.get('/delete',isLoggedIn,(req,res,next)=>{
    try{
        res.render('mypage/delete');
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/delete', isLoggedIn, async(req,res,next)=>{
    try{
        await Drop.create({
           email : req.user.email,
           reason : req.body.drop,
           etc : req.body.etc,
        });

        await User.destroy({
            where : {email : req.user.email}
        });
        res.send(
            "<script>alert('정상적으로 탈퇴되었습니다.'); window.location='/'</script>"
        );
    }catch(err){
        console.error(err);
        next(err);
    }
})

//비밀번호 변경
router.get('/password',isLoggedIn, async(req,res,next)=>{
    try{
        const user = await User.findOne({where : {email : req.user.email}});
        if(user.provider != 'local'){
            res.send(
            "<script>alert('카카오톡, 네이버 로그인은 비밀번호 변경이 불가능합니다.'); history.back();</script>"
            )
        }else{
            res.render('mypage/password');
        }   
    }catch(err){
        console.error(err);
        next(err);
    }
})

router.post('/password',isLoggedIn,async(req,res,next)=>{
    try{
        const {current_password, new_password} = req.body;
        const hash = await bcrypt.hash(new_password, 12);
        const isUser = await User.findOne({where: {email : req.user.email}});
        const result = await bcrypt.compare(current_password, isUser.password);

        if(result){
            await User.update({
                password : hash,
            },{
                where: {id:req.user.id},
            });
            res.send(
                "<script>alert('비밀번호가 변경되었습니다.'); window.location='/'</script>"
            );
        }else{
            res.send(
                "<script>alert('현재 비밀번호를 확인해주세요.'); window.location='/'</script>"
            );
        }
        
    }catch(err){
        console.error(err);
        next(err);
    }
})


module.exports = router;