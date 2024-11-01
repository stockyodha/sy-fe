

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockImageService {

  constructor() { }

  private getInitials(name: string): string {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
  }

  private stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  public generateProfileImage(stockName: string, size: number = 100): string {
    const initials = this.getInitials(stockName);
    const bgColor = this.stringToColor(stockName);
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Draw the background
      context.fillStyle = bgColor;
      context.fillRect(0, 0, size, size);
      
      // Set text properties
      context.font = `${size / 2}px Arial`;
      context.fillStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Draw the initials
      context.fillText(initials, size / 2, size / 2);
    }
    
    // Return the data URL of the image
    return canvas.toDataURL();
  }
}
