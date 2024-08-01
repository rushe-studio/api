import process from 'process';
import * as esbuild from 'esbuild';

const isWatchMode = process.argv[2] === '--watch';

async function run() {
    const options = {
        entryPoints: ['./src/index.ts'],
        bundle: true,
        outdir: './build',
        tsconfig: './tsconfig.json',
        format: 'esm',
        platform: 'node',
        loader: { '.ts': 'ts' },
        allowOverwrite: true,
        external: ['fastify']
    }

    if (isWatchMode) {
        options.sourcemap = 'linked';
        const ctx = await esbuild.context(options);
        await ctx.watch();
        console.log('Watching for changes...');
    } else {
        options.minify = true;
        options.keepNames = true;
        options.treeShaking = true;
        await esbuild.build(options);
    }
}

run();