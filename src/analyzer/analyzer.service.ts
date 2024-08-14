import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyzerService {

    async wordCounts(text: string):Promise<number>{
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }

    async characterCounts(text: string):Promise<number>{
        return text.length
    }

    async sentenceCounts(text: string):Promise<number>{
        return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
    }
    async paragraphCounts(text: string):Promise<number>{
        return text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0).length
    }
    async getLongestWord(text: string):Promise<string[]>{
        const words = text.replace(/[.,!?;:()\[\]{}"']/g, '').split(/\s+/).filter(word => word.length > 0);
        const maxLength = Math.max(...words.map(word => word.length));
        return words.filter(word => word.length === maxLength);
    }
}
